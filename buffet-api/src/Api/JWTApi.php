<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Database\Models\UserModel;
use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use DomainException;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use InvalidArgumentException;
use stdClass;
use UnexpectedValueException;

class JWTApi
{

    public function __construct()
    {}

    /**
     * Generates and returns a signed JWT token
     *
     * @param  string $username username of the user generating this JWT
     * @return string generated JWT token
     */

    function getToken(int $uid, string $username): string
    {
        $isAdmin = UserModel::isAdmin($uid);

        $key = 'example_key';
        $payload = [
            'iss' => $_SERVER['HTTP_HOST'],
            'iat' => time(),
            'exp' => time() + (60 * 60),
            'sub' => $uid,
            'name' => $username,
            'admin' => $isAdmin
        ];

        $jwt = JWT::encode($payload, $key, 'HS384');

        return $jwt;
    }

    /**
     * @return string
     */
    public static function getAdminToken(): string
    {
        $admin = UserModel::query()->where('isAdmin', 1)->first()->toArray();

        $jwt = new JWTApi();
        $token = $jwt->getToken($admin['id'], $admin['username']);

        return $token;
    }

    /**
     * Decodes JWT token and returns an object with details (should be array (WIP))
     *
     * @param  ApiResponse          $response JWT token to decode
     * @return ApiResponse|stdClass decoded JWT token API response(if failed) stdClass (decoded JWT token)
     */

    function decodeToken(ApiResponse $response): ApiResponse | stdClass
    {
        $token = (string) $response->getRequestByKey('token');
        $key = 'example_key';
        if ($token == "") {
            return $response->setError(Error::MissingToken);
        }
        try {
            $dec = JWT::decode($token, new Key($key, 'HS384'));
        } catch (SignatureInvalidException) {
            return $response->setError(Error::TamperedSign);
        } catch (InvalidArgumentException) {
            return $response->setError(Error::CorruptedOrNull);
        } catch (DomainException) {
            return $response->setError(Error::Corrupted);
        } catch (ExpiredException) {
            return $response->setError(Error::TokenExpired);
        } catch (UnexpectedValueException) {
            return $response->setError(Error::UnexpectedValue);
        }
        return $dec;
    }

/**
 * Verifies JWT token
 *
 * @param  ApiResponse $response JWT token to verify
 * @return bool        API response
 */

    function validateToken(ApiResponse $response): bool
    {

        $jwt = $this->decodeToken($response);

        if (!$jwt instanceof ApiResponse) {

            if ($_SERVER['HTTP_HOST'] != 'localhost') {
                if ($jwt->iss != $_SERVER['HTTP_HOST']) {
                    $response->setError(Error::BadDomain);
                }
            }

            if ($jwt->iat > time()) {
                $response->setError(Error::TooEarly);
            }

            if ($jwt->exp < time()) {
                $response->setError(Error::TokenExpired);
            }
        }
        return $response->getStatus();
    }
}

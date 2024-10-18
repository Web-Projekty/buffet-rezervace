<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Buffet\Types\Success;
use DomainException;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use InvalidArgumentException;
use UnexpectedValueException;

class JWTApi
{

    /**
     * Generates and returns a signed JWT token
     *
     * @param  string $username username of the user generating this JWT
     * @return string generated JWT token
     */

    function getToken(string $username): string
    {
        $user_id = -1;
        $key = 'example_key';
        $payload = [
            'iss' => $_SERVER['HTTP_HOST'],
            'iat' => time(),
            'exp' => time() + (60 * 60),
            'sub' => $user_id,
            'name' => $username,
            'admin' => false
        ];

        $jwt = JWT::encode($payload, $key, 'HS384');

        return $jwt;
    }

    /**
     * Decodes JWT token and returns an object with details (should be array (WIP))
     *
     * @param  ApiResponse $token  JWT token to decode
     * @return mixed       decoded JWT token
     */

    function decodeToken(ApiResponse $response)
    {
        $token = $response->getRequestByKey('token');
        $key = 'example_key';
        try {
            $dec = JWT::decode($token, new Key($key, 'HS384'));
        } catch (SignatureInvalidException $e) {
            return $response->setError(Error::TamperedSign);
        } catch (InvalidArgumentException $e) {
            return $response->setError(Error::CorruptedOrNull);
        } catch (DomainException $e) {
            return $response->setError(Error::Corrupted);
        } catch (ExpiredException $e) {
            return $response->setError(Error::TokenExpired);
        } catch (UnexpectedValueException $e) {
            return $response->setError(Error::UnexpectedValue);
        }
        return $dec;
    }

/**
 * Verifies JWT token
 *
 * @param  ApiResponse $response JWT token to verify
 * @return ApiResponse API response
 */

    function validateToken(ApiResponse $response): ApiResponse
    {

        $jwt = $this->decodeToken($response);

        if ($jwt instanceof ApiResponse) {
            return $response;
        }

        if ($jwt->iss != $_SERVER['HTTP_HOST']) {
            return $response->setError(Error::BadDomain);
        }

        if ($jwt->iat > time()) {
            return $response->setError(Error::TooEarly);
        }

        if ($jwt->exp < time()) {
            return $response->setError(Error::TokenExpired);
        }

        return $response->setSuccess(Success::Verification);
    }
}

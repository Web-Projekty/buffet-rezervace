<?php

namespace Buffet\Api;

use DomainException;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use InvalidArgumentException;
use UnexpectedValueException;

class JWTApi
{
    function getToken($username)
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

    function decodeToken($token)
    {
        $key = 'example_key';
        try {
            $dec = JWT::decode($token, new Key($key, 'HS384'));
        } catch (SignatureInvalidException $e) {
            return ['success' => false, 'error' => "tampered signature"];
        } catch (InvalidArgumentException $e) {
            return ['success' => false, 'error' => "corrupted data or null"];
        } catch (DomainException $e) {
            return ['success' => false, 'error' => "corrupted data"];
        } catch (ExpiredException $e) {
            return ['success' => false, 'error' => "token expired"];
        } catch (UnexpectedValueException $e) {
            return ['success' => false, 'error' => "unexpected value"];
        }
        return $dec;
    }

    function validateToken($token)
    {
        $jwt = $this->decodeToken($token);
        if (is_array($jwt)) {
            return $jwt;
        }

        if ($jwt->iss != $_SERVER['HTTP_HOST'])
            return ['success' => false, 'error' => "bad domain"];

        if ($jwt->iat > time())
            return ['success' => false, 'error' => "too early"];

        if ($jwt->exp < time())
            return ['success' => false, 'error' => "too late"];

        return ['success' => true, 'error' => "verification successuful"];
    }
}

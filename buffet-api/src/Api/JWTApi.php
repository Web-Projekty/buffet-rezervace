<?php

namespace Buffet\Api;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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
    function decodeToken($token){
        $key = 'example_key';
        $dec = JWT::decode($token, new Key($key, 'HS384'));
    }
}

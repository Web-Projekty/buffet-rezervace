<?php
namespace Buffet\Api;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTApi{
function getToken(){
    $key = 'example_key';
    $host = $_SERVER['HTTP_HOST'];
            $payload = [
                'iss' => 'https://buffet.vlastas.cc',
                'iat' => rand(0,99999999999),
                'nbf' => 1357000000
            ];

            $jwt = JWT::encode($payload, $key, 'HS384');
            $dec = JWT::decode($jwt, new Key($key, 'HS384'));
}
}
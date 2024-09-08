<?php

namespace Buffet\Database;

use Dotenv\Dotenv;

class CredentialsManager
{
    function getCredentials(): array
    {
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        $cipher = "aes-256-ecb";

        $filename = __DIR__ . "/creds.json";
        $fileContent = file_get_contents($filename);

        $json = json_decode($fileContent);

        $userH = $json->{'db_user'};
        $passH = $json->{'db_pass'};

        $username = openssl_decrypt($userH, $cipher, $_ENV['DECRYPT_KEY']);
        $password = openssl_decrypt($passH, $cipher, $_ENV['DECRYPT_KEY']);



        return [
            'db_host' => $json->{'db_host'},
            'db_user' => $username,
            'db_pass' => $password,
            'db_name' => $json->{'db_name'}
        ];
    }
    function createCredentials($username, $password)
    {
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        $cipher = "aes-256-ecb";

        $userH = base64_encode(openssl_encrypt($username, $cipher, $_ENV['DECRYPT_KEY'], OPENSSL_RAW_DATA));
        $passH = base64_encode(openssl_encrypt($password, $cipher, $_ENV['DECRYPT_KEY'], OPENSSL_RAW_DATA));

        $file = fopen(__DIR__ . "/creds.json", "w");

        $config = [
            'db_host' => 'localhost',
            'db_user' => $userH,
            'db_pass' => $passH,
            'db_name' => 'database_name'
        ];
        fwrite($file, json_encode($config, JSON_PRETTY_PRINT));
        fclose($file);
    }
}

<?php

declare (strict_types = 1);

namespace Buffet\Database;

## uses external library to parse .env file

use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Dotenv\Dotenv;

class CredentialsManager
{
    /**
     * @param ApiResponse $response
     */
    function __construct(private ApiResponse $response)
    {}

    /**
     * Returns decrypted database credentials or an error msg
     *
     * Uses openssl decryption
     *
     * @return array Schema here: https://github.com/Web-Projekty/buffet-rezervace/wiki/getCredentials()
     */
    function getCredentials(): array
    {
        if (!$this->envExists()) {
            return ['success' => false];
        }

        ## loads .env file
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        $cipher = "aes-256-ecb";

        ## opens local file with stored credentials
        $filename = __DIR__ . "/creds.json";
        $fileContent = file_get_contents($filename);

        $json = json_decode($fileContent);

        $userH = $json->{'db_user'};
        $passH = $json->{'db_pass'};

        if (empty($_ENV['DECRYPT_KEY']) || !isset($_ENV['DECRYPT_KEY'])) {
            return $this->response->setError(Error::FailedDecrypt);
        }

        $username = openssl_decrypt($userH, $cipher, $_ENV['DECRYPT_KEY']);
        $password = openssl_decrypt($passH, $cipher, $_ENV['DECRYPT_KEY']);

        if (is_string($username) && is_string($password)) {
            $out = [
                'db_host' => $json->{'db_host'},
                'db_user' => $username,
                'db_pass' => $password,
                'db_name' => $json->{'db_name'},
                'success' => true
            ];
        } else {
            $out = ['success' => false];
        }

        return $out;
    }

    /**
     * Takes two parameters, encrypts them and saves them to a json file
     *
     * Uses openssl encryption
     *
     * @param  string $username   Username to encrypt.
     * @param  string $password   Password to encrypt.
     * @return void   Description of the return value.
     */
    function createCredentials($username, $password, $host = "vlastas.cc", $database = "buffet"): void
    {
        $this->envExists();

        ## loads .env file
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        $cipher = "aes-256-ecb";

        $userH = base64_encode(openssl_encrypt($username, $cipher, $_ENV['DECRYPT_KEY'], OPENSSL_RAW_DATA));
        $passH = base64_encode(openssl_encrypt($password, $cipher, $_ENV['DECRYPT_KEY'], OPENSSL_RAW_DATA));

        ## opens local file with stored credentials
        $file = fopen(__DIR__ . "/creds.json", "w");

        $config = [
            'db_host' => $host,
            'db_user' => $userH,
            'db_pass' => $passH,
            'db_name' => $database
        ];
        fwrite($file, json_encode($config, JSON_PRETTY_PRINT));
        fclose($file);
    }

    function envExists(): bool
    {
        if (!file_exists(__DIR__ . "/.env")) {
            $this->response->setError(Error::NoEnv);
            return false;
        }
        return true;
    }
}

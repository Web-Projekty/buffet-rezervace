<?php

namespace Buffet\Database;

use Dotenv\Dotenv;

class CredentialsManager
{
    function getCredentials(): array
    {
        $dotenv = Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        $credentials = [$_ENV['DECRYPT_KEY']];
        return $credentials;
    }
}

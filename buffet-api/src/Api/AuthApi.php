<?php

namespace Buffet\Api;

use Buffet\Database\Database;

class AuthApi
{

    function register($username, $password)
    {
        $db = new Database;

        $password = password_hash($password, PASSWORD_BCRYPT);

        if ($db->isDuplicate("users", "username", $username)) {
            return ["duplicate"];
        }
    }
}

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
            return ['success' => false, 'error' => "username is in use"];
        }

        $db->query("INSERT INTO `users` (`id`, `username`, `password`) VALUES (NULL, '$username', '$password')");
        return ['success' => true, 'error' => "registered successfully"];
    }

    function login($username, $password)
    {
        $db = new Database;

        $result = $db->query("SELECT `password` FROM `users` WHERE `username` = '$username'");

        $hash = $result->fetch_row()[0];

        if (password_verify($password, $hash)) {

            $jwt = "WIP";

            return ['success' => true, 'token' => $jwt];
        } else {
            return ['success' => false, 'error' => "failed to login"];
        }
    }
}

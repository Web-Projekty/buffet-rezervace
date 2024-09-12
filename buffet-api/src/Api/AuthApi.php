<?php

namespace Buffet\Api;

use Buffet\Database\Database;

class AuthApi
{

    /**
     * Creates a user profile based on the credentials provided
     *
     * Returns errors when user profile cannot be created
     *
     * @param string $username
     * @param string $password
     * @return array Api response
     */

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

    /**
     * Verifies user credentials.
     *
     * Returns errors when user credentials are incorrect
     *
     * @param string $username
     * @param string $password
     * @return array Api response with JWT token
     */

    function login($username, $password)
    {
        $db = new Database;
        $jwt = new JWTApi;

        $result = $db->query("SELECT `password` FROM `users` WHERE `username` = '$username'");

        $hash = $result->fetch_row()[0];

        if (password_verify($password, $hash)) {

            $token = $jwt->getToken($username);

            return ['success' => true, 'token' => $token];
        } else {
            return ['success' => false, 'error' => "failed to login"];
        }
    }
}

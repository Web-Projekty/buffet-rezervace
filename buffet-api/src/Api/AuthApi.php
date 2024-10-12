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

        $db->query("INSERT INTO `users` (`id`, `username`, `password`,`isAdmin`) VALUES (NULL, '$username', '$password',0)");
        return ['success' => true, 'error' => "registered successfully"];
    }

    /**
     * Verifies user credentials.
     *
     * Returns errors when user credentials are incorrect
     *
     * @param string $username
     * @param string $password
     * @return array Api response with JWT token and account information
     */

    function login($username, $password)
    {
        $db = new Database;
        $jwt = new JWTApi;

        $result = $db->query("SELECT `password`,`isAdmin`,`fullName`,`email`,`class` FROM `users` WHERE `username` = '$username'");

        $assoc = $result->fetch_assoc();
        $hash = $assoc['password'];
        $isAdmin = $assoc['isAdmin'];
        $fullName = $assoc['fullName'];
        $email = $assoc['email'];
        $class = $assoc['class'];

        if (password_verify($password, $hash)) {

            $token = $jwt->getToken($username);

            return ['success' => true, 'token' => $token, 'username' => $username, 'isAdmin' => $isAdmin ? true : false, 'fullName' => $fullName, 'email' => $email, 'class' => $class];
        } else {
            return ['success' => false, 'error' => "failed to login"];
        }
    }
}

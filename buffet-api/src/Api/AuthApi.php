<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Database\Database;
use Buffet\Database\Models\UserModel;
use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Buffet\Types\Success;

class AuthApi
{

    /**
     * Creates a user profile based on the credentials provided
     *
     * Returns errors when user profile cannot be created
     *
     * @param  ApiResponse
     * @return ApiResponse    Api response
     */

    function register(ApiResponse $response): ApiResponse
    {
        $username = $response->getRequestByKey("username");
        $password = $response->getRequestByKey("password");

        $password = password_hash($password, PASSWORD_BCRYPT);

        if (UserModel::isDuplicate("username", $username)) {

            $response->setError(Error::UserInUse);
            return $response;
        }

        UserModel::createUser($username, $password);
        $response->setSuccess(Success::Registration);
        return $response;
    }

    /**
     * Verifies user credentials.
     *
     * Returns errors when user credentials are incorrect
     *
     * @param  ApiResponse $response
     * @return ApiResponse Api response with JWT token and account information
     */

    function login($response)
    {
        $jwt = new JWTApi;

        $username = $response->getRequestByKey("username");
        $password = $response->getRequestByKey("password");

        $assoc = UserModel::getUserByName($username);

        if (isset($assoc['password'])) {
            $hash = $assoc['password'];
            $isAdmin = $assoc['isAdmin'];
            $fullName = $assoc['fullName'];
            $email = $assoc['email'];
            $class = $assoc['class'];
        } else {
            return $response->setError(Error::NonexistentUser);
        }

        if (password_verify($password, $hash)) {

            $token = $jwt->getToken($username);

            foreach ($response->getPayloadKeys() as $key) {
                $response->setPayload($key, $$key);
            }
            $response->setSuccess(Success::Login);
        } else {
            $response->setError(Error::WrongPassword);
            //return ['success' => false, 'error' => "failed to login"];
        }
        return $response;
    }
}

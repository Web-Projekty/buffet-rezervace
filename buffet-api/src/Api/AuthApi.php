<?php

declare (strict_types = 1);

namespace Buffet\Api;

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
     * @param  ApiResponse $response - incomming api response
     * @return ApiResponse Api response
     */

    function register(ApiResponse $response): ApiResponse
    {
        $username = $response->getRequestByKey("username");
        $password = $response->getRequestByKey("password");
        $passwordConfirm = $response->getRequestByKey("passwordConfirm");
        $fullName = $response->getRequestByKey("fullName");
        $tel = $response->getRequestByKey("tel");
        $email = $response->getRequestByKey("email");

        $passwordHashed = password_hash($password, PASSWORD_BCRYPT);

        if (UserModel::isDuplicate("username", $username)) {

            $response->setError(Error::UserInUse);
            return $response;
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

            $response->setError(Error::InvalidEmail);
            return $response;
        }

        if ($password !== $passwordConfirm) {
            $response->setError(Error::PasswordMismatch);
            return $response;
        }

        if (UserModel::isDuplicate("email", $email)) {
            $response->setError(Error::EmailInUse);
            return $response;
        }

        if (UserModel::createUser(username: $username, password: $passwordHashed, fullName: $fullName, tel: $tel, email: $email)) {
            return $response->setSuccess(Success::Registration);
        }

        return $response->setError(Error::RegistrationFailed);
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

        if (!$assoc = UserModel::getUserByName($username)) {
            return $response->setError(Error::NonexistentUser);
        }

        if (isset($assoc['password'])) {
            $uid = $assoc['id'];
            $hash = $assoc['password'];
            $isAdmin = $assoc['isAdmin'];
            $fullName = $assoc['fullName'];
            $email = $assoc['email'];
            $class = $assoc['class'];
            $tel = $assoc['tel'];

        } else {
            return $response->setError(Error::NonexistentUser);
        }

        if (password_verify($password, $hash)) {

            $token = $jwt->getToken($uid, $username); // is acutally used don't trust the intelephense

            foreach ($response->getPayloadKeys() as $key) {
                $response->setPayload($key, $$key); // $token used right here
            }
            $response->setSuccess(Success::Login);
        } else {
            $response->setError(Error::WrongPassword);
        }
        return $response;
    }
}

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

        $password = password_hash($password, PASSWORD_BCRYPT);

        if (UserModel::isDuplicate("username", $username)) {

            $response->setError(Error::UserInUse);
            return $response;
        }

        if (UserModel::createUser($username, $password)) {
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

    function login(ApiResponse $response): ApiResponse
    {
        $user = $response->getRequestByKey('username');
        $pass = $response->getRequestByKey('password');

        $ldapServer = "ldap://vlastas.cc"; // URL of the LDAP server
        $ldapPort = 389;                   // Default port for LDAP is 389

                                                 // User credentials
        $ldapUser = "cn=admin,dc=vlastas,dc=cc"; // LDAP distinguished name (DN)
        $ldapPassword = "prestizniBuffet2305";   // Password

        // Connect to the LDAP server
        $ldapConnection = ldap_connect($ldapServer);
        ob_start();
        if (!$ldapConnection) {

            die("Could not connect to LDAP server.");

        }
        ldap_set_option($ldapConnection, LDAP_OPT_PROTOCOL_VERSION, 3);

        /*if (@ldap_bind($ldapConnection, $ldapUser, $ldapPassword)) {
        echo "Authenticated to LDAP server successfully!";
        } else {
        echo "LDAP bind failed: " . ldap_error($ldapConnection);
        }*/
        $userDn = "uid=$user,cn=zaci,dc=vlastas,dc=cc";

        if (@ldap_bind($ldapConnection, $userDn, $pass)) {
            echo "Password is valid!";
            ldap_unbind($ldapConnection); // Close the connection
                                          // return true;
        } else {
            echo "Invalid username or password.";
            ldap_unbind($ldapConnection); // Close the connection
                                          //return false;
        }

        $response->setPayload("test", ob_get_clean());

        return $response->setStatus(true);
    }

/* OLD CODE WITH MYSQL
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
} else {
return $response->setError(Error::NonexistentUser);
}

if (password_verify($password, $hash)) {

$token = $jwt->getToken($uid, $username); // is acutally used don't trust the intelephense

foreach ($response->getPayloadKeys() as $key) {
$response->setPayload($key, $$key);
}
$response->setSuccess(Success::Login);
} else {
$response->setError(Error::WrongPassword);
}
return $response;
}*/
}

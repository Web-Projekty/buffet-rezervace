<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Api\AuthApi;
use Buffet\Types\ApiResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;

class BuffetApi
{

    /**
     * Main API function called by router.
     *
     * Handles api request calls
     *
     * @param  RequestInterface  $request
     * @param  ResponseInterface $html
     * @return ResponseInterface html code
     */

    function main(RequestInterface $request, ResponseInterface $html): ResponseInterface
    {
        /**
         * @var ApiResponse
         */
        $response = $this->handleApiCall();
        if ($response == null || !isset($response) || empty($response) || get_class($response) != "Buffet\Types\ApiResponse") {
            $response = new ApiResponse();
            $response->setError("Handling api call resulted in invalid data type");
        }

        $html->getBody()->write((string) $response);

        return $html->withHeader('Content-type', 'application/json');
    }

    /**
     * Main API handler.
     *
     * Calls specified requestType methods
     *
     * @return array API response
     */

    function handleApiCall(): ApiResponse
    {
        $request = $this->getPostJson();

        /**
         * @var ApiResponse
         */
        $response = new ApiResponse($request);

        switch ($request['requestType']) {
            case "test":
                return $this->handleTest($response);
                break;

            case "register";
                //return $this->handleRegister($request);
                break;

            case "login":
                //return $this->handleLogin($request);
                break;

            case "verify":
                //return $this->handleVerify($request);
                break;

            default:
                $response->setError("Api returned an invalid value");
                break;
        }
    }

/**
 * API handler for token verify
 *
 *
 * @param  array $request API request
 * @return array API response
 */

    function handleVerify($request)
    {
        $this->hasAllMembers($request, ["token"]);

        $token = $request['token'];

        $jwt = new JWTApi;

        return $jwt->validateToken($token);
    }

/**
 * API handler for user registration
 *
 *
 * @param  array $request API request
 * @return array API response
 */

    function handleRegister($request)
    {
        $this->hasAllMembers($request, ["username", "password"]);

        $username = $request['username'];
        $password = $request['password'];

        $auth = new AuthApi;

        return $auth->register($username, $password);
    }

/**
 * API handler for user lgoin
 *
 *
 * @param  array $request API request
 * @return array API response with JWT token
 */

    function handleLogin($request)
    {
        $this->hasAllMembers($request, ["username", "password"]);

        $username = $request['username'];
        $password = $request['password'];

        $auth = new AuthApi;

        return $auth->login($username, $password);
    }

/**
 * API handler for data transit testing
 *
 *
 * @param  ApiResponse $request API request
 * @return ApiResponse copy of the request
 */

    function handleTest(ApiResponse $request): ApiResponse
    {
        return $request;
    }

/**
 * Utility function for checking if all keys are present and carry data
 *
 *
 * @param  array      $request API request
 * @param  array      $members list of all the required members
 * @return bool|error if members missing kills the process and sends error otherwise true
 */

    function hasAllMembers($request, $members)
    {
        foreach ($members as $member) {
            if (!isset($request[$member]) || empty($request[$member])) {
                header('Content-Type: application/json');
                echo json_encode(['success' => false, 'error' => "missing field: " . $member]);
                die;
            }
        }
        return true;
    }

/**
 * Utility function for retrieving data
 *
 * Retrieves json data from POST method raw data and returns decode json
 *
 * @return array decoded json from POST raw data
 */

    function getPostJson()
    {
        $post = file_get_contents('php://input');
        $json = json_decode($post, true);
        return $json;
    }
}

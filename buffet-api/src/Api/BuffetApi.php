<?php

namespace Buffet\Api;

use Buffet\Api\AuthApi;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;
use Psr\Http\Message\ResponseInterface;

class BuffetApi
{
    /**
     * Main API function called by router.
     *
     * Handles api request calls
     *
     * @param RequestInterface $request
     * @param ResponseInterface $html
     * @return ResponseInterface html code
     */

    function main(RequestInterface $request, ResponseInterface $html): ResponseInterface
    {
        $output = $this->handleApiCall();

        if ($output == null || !isset($output) || empty($output)) {
            $output = ['success' => false, 'error' => "api returned a null value"];
        }

        if ($output = json_encode($output)) {
            $html->getBody()->write($output);
        } else {
            $output = json_encode(['success' => false, 'error' => "failed to encode json"]);
        }


        return $html->withHeader('Content-type', 'application/json');
    }

    /**
     * Main API handler.
     *
     * Calls specified requestType methods
     *
     * @return array API response
     */

    function handleApiCall()
    {
        $request = $this->getPostJson();

        if (empty($request['requestType']) || !isset($request['requestType'])) {
            return ['success' => false, 'error' => "undefined requestType"];
        }

        switch ($request['requestType']) {
            case "test":
                return $this->handleTest($request);
                break;

            case "register";
                return $this->handleRegister($request);
                break;

            case "login":
                return $this->handleLogin($request);
                break;

            case "verify":
                return $this->handleVerify($request);
                break;

            default:
                return ['success' => false, 'error' => "tried calling non-existent api requestType"];
                break;
        }
    }

/**
     * API handler for token verify
     *
     * @param array $request API request
     * 
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
     * @param array $request API request
     * 
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
     * @param array $request API request
     * 
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
     * @param array $request API request
     * 
     * @return array copy of the request
     */

    function handleTest($request)
    {
        return $request;
    }

/**
     * Utility function for checking if all keys are present and carry data
     *
     * @param array $request API request
     * @param array $members list of all the required members
     * 
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

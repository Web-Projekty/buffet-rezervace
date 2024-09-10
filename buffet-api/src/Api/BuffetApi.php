<?php

namespace Buffet\Api;

use Buffet\Api\AuthApi;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;
use Psr\Http\Message\ResponseInterface;

class BuffetApi
{
    function main(RequestInterface $request, ResponseInterface $html): ResponseInterface
    {
        $output = $this->handleApiCall();

        if ($output == null || !isset($output) || empty($output)) {
            $output = ['success' => false, 'error' => "api returned a null value"];
        }

        $html->getBody()->write(json_encode($output));
        return $html->withHeader('Content-type', 'application/json');
    }

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

            default:
                return ['success' => false, 'error' => "tried calling non-existent api requestType"];
                break;
        }
    }

    function handleRegister($request)
    {
        $this->hasAllMembers($request, ["username", "password"]);

        $username = $request['username'];
        $password = $request['password'];

        $auth = new AuthApi;

        return $auth->register($username, $password);
    }

    function handleLogin($request)
    {
        $this->hasAllMembers($request, ["username", "password"]);

        $username = $request['username'];
        $password = $request['password'];

        $auth = new AuthApi;

        return $auth->login($username, $password);
    }

    function handleTest($request)
    {
        return $request;
    }


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

    function getPostJson()
    {
        $post = file_get_contents('php://input');
        $json = json_decode($post, true);
        return $json;
    }
}

<?php

namespace Buffet\Api;

use Buffet\Database\Database;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;
use Psr\Http\Message\ResponseInterface;

class BuffetApi
{
    function main(RequestInterface $request, ResponseInterface $html): ResponseInterface
    {
        $output = $this->handleApiCall();

        $html->getBody()->write(json_encode($output));
        return $html->withHeader('Content-type', 'application/json');
    }

    function handleApiCall()
    {
        return $this->getPostJson();
    }

    function getPostJson()
    {
        $post = file_get_contents('php://input');
        $json = json_decode($post, true);
        return $json;
    }
}

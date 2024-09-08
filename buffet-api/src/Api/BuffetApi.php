<?php

namespace Buffet\Api;

use Buffet\Database\Database;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;
use Psr\Http\Message\ResponseInterface;

class BuffetApi
{
    function main(RequestInterface $request, ResponseInterface $html): ResponseInterface
    {
        $db = new Database;
        $output = ['msg'=>"it works"];
        $html->getBody()->write(json_encode($output));
        return $html->withHeader('Content-type', 'application/json');
    }
}

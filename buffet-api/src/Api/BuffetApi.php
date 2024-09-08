<?php

namespace Buffet\Api;

use mysqli;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;
use Psr\Http\Message\ResponseInterface;

class BuffetApi
{
    function main(RequestInterface $request, ResponseInterface $html): ResponseInterface
    {

        $output = "pain";


        $html->getBody()->write($output);
        return $html->withHeader('Content-type', 'application/json');
    }
}

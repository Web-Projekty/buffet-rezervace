<?php

namespace Buffet\Api;

use Psr\Http\Message\ServerRequestInterface as RequestInterface;
use Psr\Http\Message\ResponseInterface;

class BuffetApi
{
    function api(RequestInterface $request, ResponseInterface $html): ResponseInterface
    {
        $html->getBody()->write("<h1>Hi</h1>");
        return $html;
    }
}

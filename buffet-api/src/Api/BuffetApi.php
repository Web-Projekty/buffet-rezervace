<?php

namespace Buffet\Api;

use mysqli;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;
use Psr\Http\Message\ResponseInterface;

class BuffetApi
{
    function main(RequestInterface $request, ResponseInterface $html): ResponseInterface
    {
        $conn = new mysqli("vlastas.cc", "buffet", "prestizniBuffet2305", "buffet");
        $res = $conn->query('SELECT text FROM test');
        $dbTest = mb_convert_encoding($res->fetch_row()[0], 'UTF-8', 'auto');

        $params = (array)$request->getParsedBody();
        $response = ['requestType' => $params['requestType'], 'dbTest' => $dbTest];

        $output = json_encode($response);


        $html->getBody()->write($output);
        return $html->withHeader('Content-type', 'application/json');
    }
}

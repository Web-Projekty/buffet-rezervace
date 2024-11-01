<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use Slim\Exception\HttpNotFoundException;

class ImageProvider
{
    /**
     * @param  RequestInterface  $request
     * @param  ResponseInterface $html
     * @return mixed
     */
    function main(RequestInterface $request, ResponseInterface $html, $args): ResponseInterface
    {
        $path = $this->getFilePath($args);

        if (!file_exists($path)) {
            throw new HttpNotFoundException($request);
            return $html;
        }

        if(explode("/",mime_content_type($path))[0] != "image"){
            throw new HttpNotFoundException($request,"not an image");
            return $html;
        }

        $html->getBody()->write(file_get_contents($path));

        return $html->withHeader('Content-Type', mime_content_type($path))
            ->withHeader('Content-Disposition', 'attachment; filename="' . basename($path) . '"')
            ->withHeader('Content-Length', filesize($path));
    }

    /**
     * @param  $args
     * @return mixed
     */
    function getFilePath($args): string
    {
        $urlPath = $args['path'];
        $pathParts = explode("/", $urlPath);
        $pathPartsCount = count($pathParts) - 1;

        $path = __DIR__ . "/../../img/";

        for ($i = 0; $i < $pathPartsCount; $i++) {
            $path .= $pathParts[$i] . "/";
        }

        $path .= $pathParts[$pathPartsCount];

        return $path;
    }
}

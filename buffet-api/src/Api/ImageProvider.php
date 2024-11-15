<?php

declare (strict_types = 1);

namespace Buffet\Api;

use PHPUnit\Runner\FileDoesNotExistException;
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
        $urlPath = $args['path'];
        $path = $this->getFilePath($urlPath);

        if (!file_exists($path)) {
            throw new HttpNotFoundException($request);
            return $html;
        }

        if (explode("/", mime_content_type($path))[0] != "image") {
            throw new HttpNotFoundException($request, "not an image");
            return $html;
        }

        $html->getBody()->write(file_get_contents($path));

        return $html->withHeader('Content-Type', mime_content_type($path))
            ->withHeader('Content-Length', filesize($path));
    }

    /**
     * @param  $args
     * @return string
     */
    function getFilePath($urlPath): string
    {
        $supportedFormats = ["jpg", "png", "svg"];
        $fileFound = false;
        $pathParts = explode("/", $urlPath);
        $pathPartsCount = count($pathParts) - 1;
        $dir = __DIR__ . "/../../img/";

        for ($i = 0; $i < 1; $i++) {
            $dir .= $pathParts[$i] . "/";
        }

        $path = $dir . explode(".", $pathParts[$pathPartsCount])[0];

        foreach ($supportedFormats as $format) {
            if (file_exists($path . "." . $format)) {
                $path .= "." . $format;
                $fileFound = true;
                break;
            }
        }

        if (!$fileFound) {
            $path = $dir . "default";

            foreach ($supportedFormats as $format) {
                if (file_exists($path . "." . $format)) {
                    $path .= "." . $format;
                    $fileFound = true;
                    break;
                }
            }

        }
        return $fileFound ? $path : throw (new FileDoesNotExistException($path));
    }
}

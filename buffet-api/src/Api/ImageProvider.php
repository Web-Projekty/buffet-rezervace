<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Types\Settings;
use Buffet\Utils\EnvReader;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;
use Slim\Exception\HttpNotFoundException;

class ImageProvider
{
    /**
     * @param  RequestInterface    $request
     * @param  ResponseInterface   $html
     * @return ResponseInterface
     */
    function main(RequestInterface $request, ResponseInterface $html, mixed $args): ResponseInterface
    {
        $urlPath = $args['path'];

        // Check for query parameters
        $queryParams = $request->getQueryParams();
        if (!empty($queryParams)) {
            $uri = $request->getUri();
            $uriWithoutQuery = $uri->withQuery('');
            return $html->withStatus(302)->withHeader('Location', (string) $uriWithoutQuery);
        }

        $path = $this->getFilePath($urlPath, $request);

        if (explode("/", mime_content_type($path))[0] != "image") {
            throw new HttpNotFoundException($request, "not an image");
        }

        $html->getBody()->write(file_get_contents($path));

        $cacheDuration = (int) EnvReader::getEnvProperty(Settings::ImageCacheTime) * 60;
        $lastModifiedTime = filemtime($path);
        $md5 = md5_file($path);

        return $html->withHeader('Content-Type', mime_content_type($path))
            ->withHeader('Content-Length', (string) filesize($path))
            ->withHeader('Cache-Control', 'public, max-age=' . $cacheDuration . ", immutable")
            ->withHeader('Expires', gmdate('D, d M Y H:i:s', time() + $cacheDuration) . ' UTC')
            ->withHeader('Last-Modified', gmdate('D, d M Y H:i:s', $lastModifiedTime) . ' UTC')
            ->withHeader('ETag', '"' . $md5 . '"')
            ->withHeader('Content-Disposition', 'inline; filename="' . basename($path) . '"')
            ->withHeader('Content-MD5', base64_encode($md5))
            ->withHeader('Access-Control-Allow-Headers', '*')
            ->withHeader('Access-Control-Allow-Methods', '*');
    }

    /**
     * @param  $args
     * @return string
     */
    function getFilePath(string $urlPath, ?RequestInterface $request): string
    {
        $supportedFormats = ["jpg", "png", "svg", "webp"];
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
        if($request == null){
            return $path;
        }
        return $fileFound ? $path : throw (new HttpNotFoundException($request, "file not found: " . $path));
    }
}

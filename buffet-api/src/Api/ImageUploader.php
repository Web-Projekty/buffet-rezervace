<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

class ImageUploader
{
    /**
     * @param RequestInterface  $request
     * @param ResponseInterface $html
     */
    public function uploadImage(RequestInterface $request, ResponseInterface $html): ResponseInterface
    {

        
        return $html;
    }
}

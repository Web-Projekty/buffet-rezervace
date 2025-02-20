<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\UploadedFileInterface;

class ImageUploader
{
    /**
     * @param ServerRequestInterface $request
     */
    public function uploadImage(ServerRequestInterface $request):void
    {
        $directory = __DIR__ . '/../../img';
        ob_start();
        //phpinfo();
        $uploadedFiles = $request->getUploadedFiles();

        // handle single input with single file upload
        $uploadedFile = $uploadedFiles['image'];
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            //var_dump($directory);
            $filename = $this->moveUploadedFile($directory, $uploadedFile);
        }
    }

    /**
     * @param string                $directory
     * @param UploadedFileInterface $uploadedFile
     */

    function moveUploadedFile(string $directory, UploadedFileInterface $uploadedFile): string
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);

        // see http://php.net/manual/en/function.random-bytes.php
        $basename = bin2hex(random_bytes(8));
        $filename = sprintf('%s.%0.8s', $basename, $extension);

        $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

        return $filename;
    }
}

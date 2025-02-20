<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\UploadedFileInterface;

class ImageUploader
{
    /**
     * @param ServerRequestInterface $request
     */
    public function uploadImage(ServerRequestInterface $request, int $imageId, string $directory): void
    {
        $baseDirectory = __DIR__ . '/../../img';

        $uploadedFiles = $request->getUploadedFiles();

        $fileDirectory = $baseDirectory . '/' . $directory;

        // var_dump($fileDirectory);
        //var_dump($uploadedFiles['image']);

        $uploadedFile = $uploadedFiles['image'];
        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $filename = $this->moveUploadedFile($fileDirectory, $uploadedFile, $imageId);
        }
    }

    /**
     * @param string                $directory
     * @param UploadedFileInterface $uploadedFile
     */

    function moveUploadedFile(string $directory, UploadedFileInterface $uploadedFile, int $imageId): string
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);

        $filename = strval($imageId) . '.' . $extension;
        $fullPath = $directory . DIRECTORY_SEPARATOR . $filename;

        if (file_exists($fullPath)) {
            unlink($fullPath);
        }
        
        $uploadedFile->moveTo($fullPath);

        return $filename;
    }
}

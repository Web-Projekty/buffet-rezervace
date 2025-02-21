<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Types\ApiResponse;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\UploadedFileInterface;
use Slim\Psr7\UploadedFile;

class ImageUploader
{
    /**
     * @param ServerRequestInterface $request
     * @param int                    $imageId
     * @param string                 $directory
     * @param ApiResponse            $response
     */
    public function uploadImage(ServerRequestInterface $request, int $imageId, string $directory, ApiResponse $response): void
    {
        $baseDirectory = __DIR__ . '/../../img';

        $uploadedFiles = $request->getUploadedFiles();

        $fileDirectory = $baseDirectory . '/' . $directory;

        /**
         * @var UploadedFile
         */
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

/**
 * @param UploadedFile $uploadedFile
 */
    function isImage(UploadedFile $uploadedFile): bool
    {
        $finfo = finfo_open(FILEINFO_MIME);
        $mime = finfo_file($finfo, $uploadedFile->getFilePath());
        finfo_close($finfo);

        $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!in_array($mime, $allowedMimeTypes)) {
            return false;
        }
        return true;
    }
}

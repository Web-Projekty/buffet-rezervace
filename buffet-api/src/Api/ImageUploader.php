<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Buffet\Types\Settings;
use Buffet\Utils\EnvReader;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Psr7\UploadedFile;

class ImageUploader
{

    public string $mime;
    public ApiResponse $apiResponse;
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

        $this->apiResponse = $response;

        /**
         * @var UploadedFile
         */
        $uploadedFile = $uploadedFiles['image'];

        if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
            $filename = $this->moveUploadedFile($baseDirectory, $fileDirectory, $uploadedFile, $imageId);
        } else {
            $this->apiResponse->setError(Error::ImageUploadFailed);
        }
    }

    /**
     * @param string       $directory
     * @param UploadedFile $uploadedFile
     */
    function moveUploadedFile(string $baseDirectory, string $directory, UploadedFile $uploadedFile, int $imageId): string
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);

        if (!file_exists($baseDirectory . DIRECTORY_SEPARATOR . "tmp")) {
            mkdir($baseDirectory . DIRECTORY_SEPARATOR . "tmp");
        }

        $filename = strval($imageId) . '.webp';
        $tempFilename = $tempFileName = 'temp_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $extension;

        $tempPath = $baseDirectory . DIRECTORY_SEPARATOR . "tmp" . DIRECTORY_SEPARATOR . $tempFileName;
        $targetPath = $directory . DIRECTORY_SEPARATOR . $filename;

        if ($this->isImage($uploadedFile)) {
            //var_dump($this->mime);
        }

        $mime = $this->mime;

        $uploadedFile->moveTo($tempPath);

        switch ($mime) {
            case 'image/jpeg':
                $image = imagecreatefromjpeg($tempPath);
                break;
            case 'image/png':
                $image = imagecreatefrompng($tempPath);
                break;
            case 'image/gif':
                $image = imagecreatefromgif($tempPath);
                break;
            case 'image/webp':
                $image = imagecreatefromwebp($tempPath);
                break;
            default:
                $image = false;
        }
        if ($image) {

            if (file_exists($targetPath)) {
                unlink($targetPath);
            }

            $file = fopen($targetPath, "w");

            $quality = (int) EnvReader::getEnvProperty(Settings::ImageUploadQuality);

            imagewebp($image, $file, $quality);

            imagedestroy($image);

            unlink($tempPath);

            if (!file_exists($targetPath)) {
                $this->apiResponse->setError(Error::ImageWriteFailed);
            }

        } else {
            $this->apiResponse->setError(Error::ImageReadFailed);
        }
        return $filename;
    }

    /**
     * @param UploadedFile $uploadedFile
     */
    function isImage(UploadedFile $uploadedFile): bool
    {
        $mime = mime_content_type($uploadedFile->getFilePath());
        $this->mime = $mime;

        $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!in_array($mime, $allowedMimeTypes)) {
            return false;
        }

        return true;
    }

/**
 * @param UploadedFile $uploadedFile
 */
    function getMimeType(UploadedFile $uploadedFile): string
    {
        $finfo = finfo_open(FILEINFO_MIME);
        $mime = finfo_file($finfo, $uploadedFile->getFilePath());
        finfo_close($finfo);
        return $mime;
    }
}

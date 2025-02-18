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
        ob_start();
        if (isset($_FILES['image'])) {
            $uploadDir = '../../img/';

            $file = $_FILES['image'];
            $fileName = basename($file['name']);
            $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
            $allowedTypes = ['jpg', 'jpeg', 'png'];

            if (in_array($fileType, $allowedTypes)) {
                $targetFile = $uploadDir . uniqid() . '.' . $fileType;
                if (move_uploaded_file($file['tmp_name'], $targetFile)) {
                    echo "File uploaded successfully: " . htmlspecialchars($targetFile);
                } else {
                    echo "Error uploading file.";
                }
            } else {
                echo "Invalid file type. Only JPG and PNG are allowed.";
            }
        } else {
            echo "No file uploaded.";
        }

        $html->getBody()->write(ob_get_clean());

        return $html;
    }
}

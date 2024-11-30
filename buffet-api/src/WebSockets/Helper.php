<?php

declare (strict_types = 1);

namespace Buffet\WebSockets;

use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Buffet\Types\Success;

class Helper
{
    /**
     * @param Error $error
     */
    public function getErrorResponse(Error $error): string
    {
        $api = new ApiResponse();
        return (string) $api->requireRequestType(false)->setError($error);
    }

    /**
     * @param Success $success
     */
    public function getSuccessResponse(Success $success): string
    {
        $api = new ApiResponse();
        return (string) $api->requireRequestType(false)->setSuccess($success);
    }
}

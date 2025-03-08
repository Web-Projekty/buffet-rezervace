<?php

declare (strict_types = 1);

namespace Buffet\Utils;

use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Buffet\Types\Success;
use Buffet\WebSockets\Interfaces\StaticConnectionInterface;
use SplObjectStorage;

class Helper
{
    /**
     * @param Error $error
     */
    public static function getErrorResponse(Error $error): string
    {
        $response = new ApiResponse();
        return (string) $response->requireRequestType(false)->setError($error);
    }

    /**
     * @param Success $success
     */
    public static function getSuccessResponse(Success $success): string
    {
        $response = new ApiResponse();
        return (string) $response->requireRequestType(false)->setSuccess($success);
    }

    /**
     * @param  string $token
     * @return bool
     */
    public static function isAdmin(string $token): bool
    {
        /*$response = new ApiResponse(["token" => $token]);
        $jwtApi = new JWTApi(ignoreHost: true);

        $response->requireRequestType(false);
        $jwtApi->validateToken($response);
        if ($response->hasFailed()) {
        return false;
        }
        $uid = $jwtApi->decodeToken($response)->sub ?? 0;

        return UserModel::isAdmin($uid);*/

        $response = HttpClient::post('http://localhost/api', json_encode(['requestType' => 'isAdmin', 'token' => $token]));

        return json_decode($response)->payload->isAdmin ?? false;
    }

    /**
     * @param StaticConnectionInterface                        $conn
     * @param SplObjectStorage<StaticConnectionInterface,null> $storage
     */
    public static function attachClient(StaticConnectionInterface $conn, SplObjectStorage $storage): void
    {
        if (!self::isClientInStorage($conn, $storage)) {
            $storage->attach($conn);
        }
    }

    /**
     * @param StaticConnectionInterface                        $conn
     * @param SplObjectStorage<StaticConnectionInterface,null> $storage
     */
    public static function isClientInStorage(StaticConnectionInterface $conn, SplObjectStorage $storage): bool
    {
        foreach ($storage as $client) {
            if ($client->resourceId == $conn->resourceId) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param StaticConnectionInterface                        $conn
     * @param SplObjectStorage<StaticConnectionInterface,null> $storage
     */
    public static function removeClient(StaticConnectionInterface $conn, SplObjectStorage $storage): void
    {
        foreach ($storage as $client) {
            if ($client->resourceId == $conn->resourceId) {
                $storage->detach($client);
                break;
            }
        }
    }
}

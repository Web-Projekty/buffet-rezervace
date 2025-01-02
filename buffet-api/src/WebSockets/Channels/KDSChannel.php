<?php

declare (strict_types = 1);

namespace Buffet\WebSockets\Channels;

use Buffet\Api\BuffetApi;
use Buffet\Types\Error;
use Buffet\Types\Success;
use Buffet\Utils\Helper;
use Buffet\Utils\HttpClient;
use Buffet\WebSockets\Interfaces\MessageInterface;
use Buffet\WebSockets\Interfaces\StaticConnectionInterface;
use SplObjectStorage;

class KDSChannel implements MessageInterface
{
    /**
     * @var SplObjectStorage<StaticConnectionInterface,null> - stores only authenticated clients
     */
    protected SplObjectStorage $authenticatedClients;

    public function __construct()
    {
        $this->authenticatedClients = new SplObjectStorage;
    }

    /**
     * @param StaticConnectionInterface $conn
     */
    public function onOpen(StaticConnectionInterface $conn): void
    {
        $conn->send(Helper::getSuccessResponse(Success::ChannelConnected));
    }

    /**
     * @param StaticConnectionInterface $conn
     * @param string                    $msg
     */
    public function onMessage(StaticConnectionInterface $conn, string $msg): void
    {
        if (json_validate($msg)) {

            $decoded = json_decode($msg);

            $requestType = $decoded->requestType ?? "";

            $token = $decoded->token ?? "";

            if (!Helper::isAdmin($token)) {
                $conn->send(Helper::getErrorResponse(Error::Unauthorized));
                return;
            }

            switch ($requestType) {
                case "subscribe":
                    if (Helper::isClientInStorage($conn, $this->authenticatedClients)) {
                        $conn->send(Helper::getErrorResponse(Error::AlreadySubscribed));
                        break;
                    }

                    Helper::attachClient($conn, $this->authenticatedClients);
                    $conn->send(Helper::getSuccessResponse(Success::Subscribed));
                    $conn->send(HttpClient::post('http://localhost/api', json_encode(['requestType' => 'getOrders', 'token' => $token])));
                    break;
                case "publish":
                    foreach ($this->authenticatedClients as $client) {
                        $decoded = json_decode($msg);

                        $newMsg["eventType"] = $decoded->eventType ?? "";
                        $newMsg["payload"] = $decoded->payload ?? "";

                        $client->send(json_encode($newMsg));
                    }
                    break;
                default:
                    $api = new BuffetApi();

                    $response = $api->handleApiCall($msg);

                    $conn->send((string) $response);
            }

        } else {
            $conn->send(Helper::getErrorResponse(Error::InvalidJson));
        }

    }

    /**
     * @param StaticConnectionInterface $conn
     */
    public function onClose(StaticConnectionInterface $conn): void
    {
        Helper::removeClient($conn, $this->authenticatedClients);
    }

    /**
     * @param StaticConnectionInterface $conn
     * @param \Exception                $e
     */
    public function onError(StaticConnectionInterface $conn, \Exception $e): void
    {
        $conn->close();
    }
}

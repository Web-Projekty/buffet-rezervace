<?php

declare (strict_types = 1);

namespace Buffet\WebSockets\Channels;

use Buffet\Types\Error;
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
        //$conn->send(Helper::getSuccessResponse(Success::ChannelConnected));
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

            $isAdmin = Helper::isAdmin($token);

            switch ($requestType) {

                case "subscribe":
                    if (!$isAdmin) {
                        $conn->send(Helper::getErrorResponse(Error::Unauthorized));
                        break;
                    }
                    if (!Helper::isClientInStorage($conn, $this->authenticatedClients)) {
                        Helper::attachClient($conn, $this->authenticatedClients);
                        //$conn->send(Helper::getErrorResponse(Error::AlreadySubscribed));
                    }
                    //$conn->send(Helper::getSuccessResponse(Success::Subscribed));
                    $conn->send(HttpClient::post('http://localhost/api', json_encode(['requestType' => 'getOrders', 'token' => $token, "isKDS" => true])));
                    break;
                case "publish":
                    if (!$isAdmin) {
                        $conn->send(Helper::getErrorResponse(Error::Unauthorized));
                        break;
                    }
                    foreach ($this->authenticatedClients as $client) {
                        $decoded = json_decode($msg);

                        $newMsg["eventType"] = $decoded->eventType ?? "";
                        $newMsg["data"] = $decoded->payload ?? "";

                        $client->send(json_encode($newMsg));
                    }
                    break;
                case "ping":
                    //error_log("ping... pong... \n");
                    $conn->send(json_encode(["msg" => "pong"]));
                    break;
                default:
                    error_log("called default method: " . $msg . "\n");

                    $response = HttpClient::post('http://localhost/api', $msg);

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

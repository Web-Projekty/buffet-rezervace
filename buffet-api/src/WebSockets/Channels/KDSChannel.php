<?php

declare (strict_types = 1);

namespace Buffet\WebSockets\Channels;

use Buffet\Api\BuffetApi;
use Buffet\Types\Error;
use Buffet\Types\Success;
use Buffet\WebSockets\Helper;
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



            if (isset($decoded->requestType) && $decoded->requestType == "subscribe") {

                switch ($dec)
                $token = $decoded->token;

                if (Helper::isAdmin($token)) {
                    Helper::attachClient($conn, $this->authenticatedClients);
                }

            } else {
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

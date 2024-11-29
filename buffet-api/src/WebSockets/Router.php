<?php

declare (strict_types = 1);

namespace Buffet\WebSockets;

use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class Router implements MessageComponentInterface
{

    public KDSChannel $kds;

    public function __construct()
    {
        $this->initializeClasses();
    }

    public function initializeClasses(): void
    {
        $this->kds = new KDSChannel();
    }

    /**
     * @param ConnectionInterface $conn
     */

    public function onOpen(ConnectionInterface $conn): void
    {
        $conn = new StaticConnectionInterface($conn);

        $channel = $this->getChannel($conn);

        $channel->onOpen($conn);
    }

    /**
     * @param ConnectionInterface $sender
     * @param $msg
     */
    public function onMessage(ConnectionInterface $sender, $msg): void
    {
    }

    /**
     * @param ConnectionInterface $conn
     */
    public function onClose(ConnectionInterface $conn): void
    {
    }

    /**
     * @param ConnectionInterface $conn
     * @param \Exception          $e
     */
    public function onError(ConnectionInterface $conn, \Exception $e): void
    {
    }

    /**
     * @param  StaticConnectionInterface $conn
     * @return object
     */
    public function getChannel(StaticConnectionInterface $conn): object
    {
        $path = $conn->httpRequest->getUri()->getPath();
        // remove trailing "/" for simple routing formating
        if (strlen($path) > 1) {
            $path = rtrim($path, '/');
        }

        echo "New request from: " . $path . "\n";
        switch ($path) {
            case '/kds':
                return $this->kds;
        }

        $api = new ApiResponse;
        $api->requireRequestType(false);
        $api->setError(Error::NonexistentChannel);

        $conn->send((string) $api);
        $conn->close();
        throw new \Exception('Channel not found');
    }
}

<?php

declare (strict_types = 1);

namespace Buffet\WebSockets;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class Router implements MessageComponentInterface
{

    public Channel $channel;

    public function __construct()
    {
        $this->initializeClasses();
    }

    public function initializeClasses(): void
    {
        $this->channel = new Channel();
    }

    /**
     * @param ConnectionInterface $conn
     */
    public function onOpen(ConnectionInterface $conn): void
    {
        $conn = new StaticConnectionInterface($conn);
        $this->channel->onOpen($conn);

        echo $conn->httpRequest->getUri()->getPath()."\n";
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
}

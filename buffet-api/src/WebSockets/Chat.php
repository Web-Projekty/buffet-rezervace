<?php

declare (strict_types = 1);

namespace Buffet\WebSockets;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use SplObjectStorage;

class Chat implements MessageComponentInterface
{
    protected SplObjectStorage $clients;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
    }

    /**
     * @param ConnectionInterface $conn
     */
    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }

    /**
     * @param ConnectionInterface $sender
     * @param $msg
     */
    public function onMessage(ConnectionInterface $sender, $msg)
    {
       // echo "Message from {$sender->resourceId}: $msg\n";

        $numRecv = count($this->clients) - 1;

        foreach ($this->clients as $recipient) {
            if ($sender !== $recipient) {
                // The sender is not the receiver, send to each client connected
                $recipient->send($msg);
            }
        }

    }

    /**
     * @param ConnectionInterface $conn
     */
    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    /**
     * @param ConnectionInterface $conn
     * @param \Exception          $e
     */
    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}

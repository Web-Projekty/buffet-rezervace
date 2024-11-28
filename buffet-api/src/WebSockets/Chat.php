<?php

declare (strict_types = 1);

namespace Buffet\WebSockets;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use SplObjectStorage;

class Chat implements MessageComponentInterface
{
    protected SplObjectStorage $clients;
    protected SplObjectStorage $authenticatedClients;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
        $this->authenticatedClients = new \SplObjectStorage;
    }

    /**
     * @param ConnectionInterface $conn
     */
    public function onOpen(ConnectionInterface $conn)
    {
        $conn = new StaticConnectionInterface($conn);
        $this->clients->attach($conn);
        //var_dump($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }

    /**
     * @param ConnectionInterface $sender
     * @param $msg
     */
    public function onMessage(ConnectionInterface $sender, $msg)
    {
        $sender = new StaticConnectionInterface($sender);
        echo "Message from {$sender->resourceId}: $msg\n";

        $numRecv = count($this->clients) - 1;

        foreach ($this->clients as $recipient) {
            if ($sender->resourceId !== $recipient->resourceId) {
                // The sender is not the receiver, send to each client connected
                $recipient->send($msg);
            }
        }
        foreach ($this->authenticatedClients as $recipient) {
            $recipient->send("You are authenticated");
        }

        if ($msg == "secret") {
            $this->authenticatedClients->attach($sender);
        }

        $sender->send($this->authenticatedClients->count());
    }

    /**
     * @param ConnectionInterface $conn
     */
    public function onClose(ConnectionInterface $conn)
    {
        $conn = new StaticConnectionInterface($conn);
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    /**
     * @param ConnectionInterface $conn
     * @param \Exception          $e
     */
    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        $conn = new StaticConnectionInterface($conn);
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}

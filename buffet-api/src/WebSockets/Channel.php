<?php

declare (strict_types = 1);

namespace Buffet\WebSockets;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use SplObjectStorage;

class Channel implements MessageComponentInterface
{
    /**
     * @var SplObjectStorage<StaticConnectionInterface,mixed> - stores all connected clients
     */
    protected SplObjectStorage $clients;
    /**
     * @var SplObjectStorage<StaticConnectionInterface,mixed> - stores only authenticated clients
     */
    protected SplObjectStorage $authenticatedClients;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
        $this->authenticatedClients = new \SplObjectStorage;
    }

    /**
     * @param ConnectionInterface $conn
     */
    public function onOpen(ConnectionInterface $conn): void
    {
        $conn = new StaticConnectionInterface($conn);
        $this->clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }

    /**
     * @param ConnectionInterface $sender
     * @param $msg
     */
    public function onMessage(ConnectionInterface $sender, $msg): void
    {
        $sender = new StaticConnectionInterface($sender);
        echo "Message from {$sender->resourceId}: $msg\n";

        $numRecv = count($this->clients) - 1;

        foreach ($this->authenticatedClients as $recipient) {
            $recipient->send("You are authenticated");
        }

        if ($msg == "secret") {
            $clientExists = false;
            foreach ($this->authenticatedClients as $client) {
                if ($client->resourceId == $sender->resourceId) {
                    $clientExists = true;
                }
            }
            if (!$clientExists) {
                $this->authenticatedClients->attach($sender);
            }

        }

        foreach ($this->clients as $recipient) {
            if ($sender->resourceId !== $recipient->resourceId) {
                // The sender is not the receiver, send to each client connected
                $recipient->send($msg);
            }
            $recipient->send(json_encode(["authCount" => $this->authenticatedClients->count(), "userCount" => $this->clients->count()]));
        }

        // $sender->send($this->authenticatedClients->count());
    }

    /**
     * @param ConnectionInterface $conn
     */
    public function onClose(ConnectionInterface $conn): void
    {
        $conn = new StaticConnectionInterface($conn);

        foreach ($this->clients as $client) {
            if ($conn->resourceId == $client->resourceId) {
                $this->clients->detach($client);
            }
        }

        foreach ($this->authenticatedClients as $client) {
            if ($conn->resourceId == $client->resourceId) {
                $this->authenticatedClients->detach($client);
            }
        }
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    /**
     * @param ConnectionInterface $conn
     * @param \Exception          $e
     */
    public function onError(ConnectionInterface $conn, \Exception $e): void
    {
        $conn = new StaticConnectionInterface($conn);
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}

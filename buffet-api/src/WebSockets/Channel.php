<?php

declare (strict_types = 1);

namespace Buffet\WebSockets;

use SplObjectStorage;

class Channel implements MessageInterface
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
    }

    /**
     * @param StaticConnectionInterface $conn
     */
    public function onOpen(StaticConnectionInterface $conn): void
    {
    }

    /**
     * @param StaticConnectionInterface $conn
     * @param string                    $msg
     */
    public function onMessage(StaticConnectionInterface $conn, string $msg): void
    {

    }

    /**
     * @param StaticConnectionInterface $conn
     */
    public function onClose(StaticConnectionInterface $conn): void
    {

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

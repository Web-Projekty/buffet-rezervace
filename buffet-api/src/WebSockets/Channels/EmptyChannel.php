<?php

declare (strict_types = 1);

namespace Buffet\WebSockets\Channels;

use Buffet\WebSockets\Interfaces\MessageInterface;
use Buffet\WebSockets\Interfaces\StaticConnectionInterface;

class EmptyChannel implements MessageInterface
{
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

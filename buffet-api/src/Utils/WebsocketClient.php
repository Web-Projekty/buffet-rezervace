<?php

namespace Buffet\Utils;

use Ratchet\Client\Connector;

class WebsocketClient
{
    /**
     * @param string $message
     */
    public static function send(string $path, string $message): void
    {

        $connector = new Connector();

        $connector("ws://localhost/" . $path)->then(function ($conn) use ($message) {
            $conn->send($message);
            $conn->on('message', function ($msg) use ($conn) {
                $conn->close();
            });
        });

    }
}

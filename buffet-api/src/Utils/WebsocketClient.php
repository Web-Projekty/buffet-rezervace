<?php

declare (strict_types = 1);

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
            error_log("Sending message: " . $message);
            $conn->send($message);
            $conn->close();
            /*$conn->on('message', function ($msg) use ($conn) {
                error_log("Received message: " . $msg);
                $conn->close();
            });*/
        });

    }
}

<?php

declare (strict_types = 1);

namespace Buffet\WebSockets;

use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;

error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);

require dirname(__DIR__) . '/../vendor/autoload.php';

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Router()
        )
    )
    ,
    8069
);

$server->run();

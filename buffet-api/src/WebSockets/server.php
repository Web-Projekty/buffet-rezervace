<?php

declare (strict_types = 1);

namespace Buffet\WebSockets;

use Ratchet\App;

error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);

require dirname(__DIR__) . '/../vendor/autoload.php';

$server = new App("localhost", 8080);

$server->route('/backend', new Channel());

$server->run();

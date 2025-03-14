<?php

declare (strict_types = 1);

namespace Buffet\WebSockets;

use Buffet\Database\CredentialsManager;
use Buffet\Types\ApiResponse;
use Buffet\Types\Error;
use Buffet\WebSockets\Channels\EmptyChannel;
use Buffet\WebSockets\Channels\KDSChannel;
use Buffet\WebSockets\Interfaces\StaticConnectionInterface;
use Illuminate\Database\Capsule\Manager as Capsule;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class Router implements MessageComponentInterface
{

    public KDSChannel $kds;
    public EmptyChannel $default;

    public function __construct()
    {
        $this->initializeClasses();
    }

    public function initializeClasses(): void
    {
        $this->kds = new KDSChannel();
        $this->default = new EmptyChannel();

        $response = new ApiResponse();
        $credentialsManager = new CredentialsManager($response);

        $capsule = new Capsule;

        $creds = $credentialsManager->getCredentials();
        if ($creds['success'] == true) {
            // Eloquent ORM Capsule setup
            $capsule->addConnection([
                'driver' => 'mysql',
                'host' => $creds['db_host'],
                'database' => $creds['db_name'],
                'username' => $creds['db_user'],
                'password' => $creds['db_pass'],
                'charset' => 'utf8mb4',
                'collation' => 'utf8mb4_czech_ci',
                'prefix' => ''
            ]);

            // Make the Capsule instance available globally via static methods
            $capsule->setAsGlobal();

            // Setup the Eloquent ORM
            $capsule->bootEloquent();
        }
    }

    /**
     * @param ConnectionInterface $conn
     */

    public function onOpen(ConnectionInterface $conn): void
    {
        $conn = new StaticConnectionInterface($conn);

        $channel = $this->getChannel($conn);

        $channel->onOpen($conn);
    }

    /**
     * @param ConnectionInterface $conn
     * @param $msg
     */
    public function onMessage(ConnectionInterface $conn, $msg): void
    {
        $conn = new StaticConnectionInterface($conn);

        $channel = $this->getChannel($conn);

        $channel->onMessage($conn, $msg);
    }

    /**
     * @param ConnectionInterface $conn
     */
    public function onClose(ConnectionInterface $conn): void
    {
        $conn = new StaticConnectionInterface($conn);

        $channel = $this->getChannel($conn);

        $channel->onClose($conn);
    }

    /**
     * @param ConnectionInterface $conn
     * @param \Exception          $e
     */
    public function onError(ConnectionInterface $conn, \Exception $e): void
    {
        $conn = new StaticConnectionInterface($conn);

        $channel = $this->getChannel($conn);

        $channel->onError($conn, $e);
    }

    /**
     * @param  StaticConnectionInterface $conn
     * @return object
     */
    public function getChannel(StaticConnectionInterface $conn): object
    {
        $path = $conn->httpRequest->getUri()->getPath();
        // remove trailing "/" for simple routing formating
        if (strlen($path) > 1) {
            $path = rtrim($path, '/');
        }

        //echo "New request from: " . $path . "\n";
        switch ($path) {
            case '/kds':
                $_SERVER['HTTP_HOST'] = 'localhost';
                return $this->kds;
            default:
                $api = new ApiResponse;
                $api->requireRequestType(false);
                $api->setError(Error::NonexistentChannel);

                $conn->send((string) $api);
                $conn->close();
                return $this->default;
        }

    }
}

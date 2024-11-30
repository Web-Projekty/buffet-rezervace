<?php

declare (strict_types = 1);

namespace Buffet\WebSockets\Channels;

use Buffet\Api\BuffetApi;
use Buffet\Types\Error;
use Buffet\Types\Success;
use Buffet\WebSockets\Helper;
use Buffet\WebSockets\Interfaces\MessageInterface;
use Buffet\WebSockets\Interfaces\StaticConnectionInterface;
use SplObjectStorage;

class KDSChannel implements MessageInterface
{
    /**
     * @var SplObjectStorage<StaticConnectionInterface,mixed> - stores only authenticated clients
     */
    protected SplObjectStorage $authenticatedClients;

    protected Helper $helper;

    public function __construct()
    {
        $this->helper = new Helper();
    }

    /**
     * @param StaticConnectionInterface $conn
     */
    public function onOpen(StaticConnectionInterface $conn): void
    {
        $conn->send($this->helper->getSuccessResponse(Success::ChannelConnected));
    }

    /**
     * @param StaticConnectionInterface $conn
     * @param string                    $msg
     */
    public function onMessage(StaticConnectionInterface $conn, string $msg): void
    {
        if (json_validate($msg)) {
            $api = new BuffetApi();

            $response = $api->handleApiCall($msg);

            $conn->send((string) $response);
        } else {
            $conn->send($this->helper->getErrorResponse(Error::InvalidJson));
        }

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

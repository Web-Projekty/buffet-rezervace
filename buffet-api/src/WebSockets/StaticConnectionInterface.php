<?php
namespace Buffet\WebSockets;

use Ratchet\ConnectionInterface;

class StaticConnectionInterface
{
    /**
     * @var mixed
     */
    public $resourceId;
    /**
     * @var mixed
     */
    public $remoteAddress;
    /**
     * @var mixed
     */
    public $httpHeadersReceived;

    /**
     * @var mixed
     */
    public $httpRequest;
    /**
     * @var mixed
     */
    public $WebSocket;

    /**
     * @var mixed
     */
    private $original;

    /**
     * @param $original - original object
     */

    public function __construct(ConnectionInterface $original)
    {
        $this->original = $original;

        $this->resourceId = $original->resourceId;                   // @phpstan-ignore property.notFound
        $this->remoteAddress = $original->remoteAddress;             // @phpstan-ignore property.notFound
        $this->httpHeadersReceived = $original->httpHeadersReceived; // @phpstan-ignore property.notFound
        $this->httpRequest = $original->httpRequest;                 // @phpstan-ignore property.notFound
        $this->WebSocket = $original->WebSocket;                     // @phpstan-ignore property.notFound
    }

    /**
     * @param  $method
     * @param  $arguments
     * @return mixed
     */
    public function __call(mixed $method, mixed $arguments)
    {
        return $this->original->$method(...$arguments);
    }

    /**
     * @param  string $data
     * @return void
     */
    public function send(string $data): void
    {
        $this->original->send($data);
    }

    public function close(): void
    {
        $this->original->close();
    }
}

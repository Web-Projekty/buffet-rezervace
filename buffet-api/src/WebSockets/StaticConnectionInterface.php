<?php
namespace Buffet\WebSockets;

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
    public function __construct($original)
    {
        $this->original = $original;
        $this->resourceId = $original->resourceId;
        $this->remoteAddress = $original->remoteAddress;
        $this->httpHeadersReceived = $original->httpHeadersReceived;
        $this->httpRequest = $original->httpRequest;
        $this->WebSocket = $original->WebSocket;
    }

    /**
     * @param  $method
     * @param  $arguments
     * @return mixed
     */
    public function __call($method, $arguments)
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

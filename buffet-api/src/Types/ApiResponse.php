<?php

declare (strict_types = 1);

namespace Buffet\Types;

enum Status: string {
    case Pending = 'pending';
    case Success = 'success';
    case Failed = 'failed';
}

class ApiResponse
{
    public Status $status = Status::Pending;

    /**
     * @param array $request
     * @param array $keys
     */
    private array $payload = [];

    public function __construct(
        public array $request,
        private array $keys = []
    ) {

    }

    /**
     * @param string $key
     * @param mixed  $payload
     */
    public function addPayload(
        string $key,
        mixed $payload = ''
    ): void {
        if (!key_exists($key, $this->payload)) {
            $this->payload[$key] = $payload;
        }
    }

    /**
     * @param string $key
     * @param mixed  $payload
     */
    public function setPayload(
        string $key,
        mixed $payload = ''
    ): void {
        $payload[$key] = $payload;
    }

    /**
     * @param  string  $key
     * @return mixed
     */
    public function getPayload(string $key)
    {
        return $this->payload[$key] ?? null;
    }

    /**
     * @param string $key
     */
    public function removePayload(string $key): void
    {
        unset($this->payload[$key]);
    }

    public function checkKeys()
    {
        foreach ($this->keys as $key) {
            if (!isset($this->payload[$key])) {
                return false;
            }
        }
        return true;
    }

    public function __toString()
    {
        return json_encode(['status' => $this->status, 'payload' => $this->payload]);
    }

    public function __debugInfo()
    {
        return ['status' => $this->status, 'payload' => $this->payload];
    }
}

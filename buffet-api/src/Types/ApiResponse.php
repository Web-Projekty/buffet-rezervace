<?php

declare(strict_types=1);

namespace Buffet\Types;

enum Status: string
{
    case Pending = 'pending';
    case Success = 'success';
    case Failed = 'failed';
}


class ApiResponse
{
    public Status $status = Status::Pending;

    private array $payload = [];

    function __construct(public array $request, private array $keys = []) {}

    function addPayload(string $key, mixed $payload = ''): void
    {
        if (!key_exists($key, $this->payload))
            $this->payload[$key] = $payload;
    }

    function setPayload(string $key, mixed $payload = ''): void
    {
        $payload[$key] = $payload;
    }

    function getPayload(string $key)
    {
        return $this->payload[$key] ?? null;
    }

    function removePayload(string $key): void
    {
        unset($this->payload[$key]);
    }

    function checkKeys()
    {
        foreach ($this->keys as $key) {
            if (!isset($this->payload[$key])) {
                return false;
            }
        }
        return true;
    }

    function __toString()
    {
        return json_encode(['status' => $this->status, 'payload' => $this->payload]);
    }

    function __debugInfo()
    {
        return ['status' => $this->status, 'payload' => $this->payload];
    }
}

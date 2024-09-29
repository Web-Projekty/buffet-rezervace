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
    private array $payload = [];

    /**
     * @param array $request
     * @param array $keys
     */

    public function __construct(public array $request = [], private array $keys = [])
    {}

    /**
     * @param string $key
     * @param mixed  $payload
     */
    public function addPayload(string $key, mixed $payload = ''): void
    {
        if ($this->status == Status::Failed) {
            return;
        }
        if (!key_exists($key, $this->payload)) {
            $this->payload[$key] = $payload;
        }

    }

    /**
     * @param string $key
     * @param mixed  $payload
     */
    public function setPayload(string $key, mixed $payload = ''): void
    {
        if ($this->status == Status::Failed) {
            return;
        }
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
     * @return mixed
     */
    public function getRequestType(): string
    {
        return $this->request['requestType'] ?? null;
    }

    /**
     * @param string $key
     */
    public function removePayload(string $key): void
    {
        if ($this->status == Status::Failed) {
            return;
        }
        unset($this->payload[$key]);
    }

    /**
     * @param string $msg
     */
    public function setError(string $msg): void
    {
        if ($this->status === Status::Failed) {
            return;
        }
        $this->status = Status::Failed;
        unset($this->payload);
        $this->payload["msg"] = $msg ?? null;
    }

    /**
     * @param array $keys
     */
    public function setKeys(array $keys): void
    {
        unset($this->keys);
        $this->keys = $keys;
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
        if ($this->status === Status::Pending) {
            $this->setError("Status is still pending");
        }
        return json_encode(['status' => $this->status, 'payload' => $this->payload]);
    }

    public function __debugInfo()
    {
        return ['status' => $this->status, 'payload' => $this->payload];
    }
}

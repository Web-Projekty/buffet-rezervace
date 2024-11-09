<?php

declare (strict_types = 1);

namespace Buffet\Types;

class ApiResponse
{
    public Status $status = Status::Pending;

    private array $requestKeys = [];

    private array $payloadKeys = [];
    private array $payload = [];

    /**
     * @param array $request
     * @param array $payloadKeys
     */

    public function __construct(public ?array $request = []) // allows for request to be null
    {
        if (!isset($this->request['requestType'])) {
            $this->setError(Error::MissingRequestType);
        }
    }

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
        $this->payload[$key] = $payload;
    }

    /**
     * @param  string $key
     * @return mixed  $payload
     */
    public function getPayload(string $key)
    {
        return $this->payload[$key] ?? null;
    }

    /**
     * @return string|null $requestType
     */
    public function getRequestType(): string | null
    {
        return $this->request['requestType'] ?? null;
    }

    /**
     * @return array|null $request
     */
    public function getRequest(): array | null
    {
        return $this->request ?? null;
    }

    /**
     * @param  string     $key
     * @return mixed|null $requestMember
     */
    public function getRequestByKey(string $key): mixed
    {
        return $this->request[$key] ?? null;
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
     * @param  Error       $msg
     * @return ApiResponse $this - optional
     */
    public function setError(Error $msg): ApiResponse
    {
        if ($this->status !== Status::Failed) {
            $this->status = Status::Failed;
            unset($this->payload);
            $this->payload["msg"] = $msg->getValue() ?? null;
        }

        return $this;
    }

    /**
     * @param  Success     $msg
     * @return ApiResponse $this - optional
     */
    public function setSuccess(Success $msg): ApiResponse
    {
        if ($this->status !== Status::Failed) {
            $this->status = Status::Success;
            $this->addPayload("msg", $msg->getValue() ?? null);
        }

        return $this;
    }

    /**
     * @param array $payloadKeys
     */
    public function setRequestKeys(array $requestKeys): void
    {
        unset($this->requestKeys);
        $this->requestKeys = $requestKeys;
    }

    /**
     * @return array
     */
    public function getPayloadKeys(): array
    {
        return $this->payloadKeys ?? null;
    }

    /**
     * @param array $payloadKeys
     */
    public function setPayloadKeys(array $payloadKeys): void
    {
        unset($this->payloadKeys);
        $this->payloadKeys = $payloadKeys;
    }

    /**
     * @return bool
     */
    public function getStatus(): bool
    {
        if ($this->status === Status::Failed) {
            return false;
        }
        return true;
    }

    /**
     * @param bool $status
     */
    public function setStatus(bool $status): ApiResponse
    {
        $this->status = $status ? Status::Success : Status::Failed;
        return $this;
    }

    /**
     * @return bool
     */
    public function hasRequestKeys(): bool
    {
        foreach ($this->requestKeys as $key) {
            if (!isset($this->request[$key]) || empty($this->request[$key])) {
                return false;
            }
        }
        return true;
    }

    public function hasPayloadKeys(): bool
    {
        foreach ($this->payloadKeys as $key) {
            if (!isset($this->payload[$key])) {
                return false;
            }
        }
        return true;
    }

    /**
     * @return bool
     */
    public function hasFailed()
    {
        return $this->status === Status::Failed ? true : false;
    }

    public function __toString()
    {
        if (!$this->hasRequestKeys()) {
            $this->setError(Error::MissingRequestKeys);
        }

        if (!$this->hasPayloadKeys()) {
            $this->setError(Error::MissingPayloadKeys);
        }

        if ($this->status === Status::Pending) {
            $this->setError(Error::StatusPending);
        }

        return json_encode(['status' => $this->status, 'payload' => $this->payload]);
    }

    public function __debugInfo()
    {
        return ['status' => $this->status, 'payload' => $this->payload];
    }
}

<?php

declare (strict_types = 1);

namespace Buffet\Types;

use Exception;

class ApiResponse
{
    private ApiStatus $status = ApiStatus::Pending;

    /**
     * @var array<mixed>
     */
    private array $requestKeys = [];

    /**
     * @var array<string>
     */
    private array $payloadKeys = [];
    /**
     * @var array<mixed>
     */
    private array $payload = [];

    private bool $requireRequestType = true;

    /**
     * @param array<mixed> $request
     */
    public function __construct(public ?array $request = []) // allows for request to be null
    {
    }

    /**
     * @param string $key
     * @param mixed  $payload
     */
    public function addPayload(string $key, mixed $payload = ''): void
    {
        if ($this->status == ApiStatus::Failed) {
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
        if ($this->status == ApiStatus::Failed) {
            return;
        }
        $this->payload[$key] = $payload;
    }

    /**
     * @param  string $key
     * @return mixed  $payload
     */
    public function getPayload(string $key = null)
    {
        if (!$key) {
            return $this->payload;
        }
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
     * @return array<mixed>|null $request
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
    public function hasRequestByKey(string $key): bool
    {
        return isset($this->request[$key]);
    }

    /**
     * @param string $key
     */
    public function removePayload(string $key): void
    {
        if ($this->status == ApiStatus::Failed) {
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
        if ($this->status !== ApiStatus::Failed) {
            $this->status = ApiStatus::Failed;
            unset($this->payload);
            $this->payload["msg"] = $msg->getValue();
        }

        return $this;
    }

    /**
     * @param  Success     $msg
     * @return ApiResponse $this - optional
     */
    public function setSuccess(Success $msg): ApiResponse
    {
        if ($this->status !== ApiStatus::Failed) {
            $this->status = ApiStatus::Success;
            $this->addPayload("msg", $msg->getValue());
        }

        return $this;
    }

    /**
     * @param bool $value
     */
    public function requireRequestType(bool $value): ApiResponse
    {
        $this->requireRequestType = $value;
        return $this;
    }

    /**
     * @param array<mixed> $requestKeys
     */
    public function setRequestKeys(array $requestKeys): void
    {
        unset($this->requestKeys);
        $this->requestKeys = $requestKeys;
    }

    /**
     * @param string $key
     * @param mixed  $value
     */
    public function setRequestByKey(string $key, mixed $value): void
    {
        $this->request[$key] = $value ?? null;
    }

    /**
     * @return array<string>
     */
    public function getPayloadKeys(): array | null
    {
        return $this->payloadKeys ?? null;
    }

    /**
     * @param array<string> $payloadKeys
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
        if ($this->status === ApiStatus::Failed) {
            return false;
        }
        return true;
    }

    /**
     * @param bool $status
     */
    public function setStatus(bool $status): ApiResponse
    {
        $this->status = $status ? ApiStatus::Success : ApiStatus::Failed;
        return $this;
    }

    /**
     * @return bool
     */
    public function hasRequestKeys(): bool
    {
        foreach ($this->requestKeys as $key) {
            if (!isset($this->request[$key]) || empty($this->request[$key])) {
                throw new Exception("Missing key: " . $key);
                //return false;
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
    public function hasFailed(): bool
    {
        return $this->status === ApiStatus::Failed;
    }

    public function __toString()
    {
        if (!isset($this->request['requestType']) && $this->requireRequestType) {
            $this->setError(Error::MissingRequestType);
        }

        if (!$this->hasRequestKeys()) {
            $this->setError(Error::MissingRequestKeys);
        }

        if (!$this->hasPayloadKeys()) {
            $this->setError(Error::MissingPayloadKeys);
        }

        if ($this->status === ApiStatus::Pending) {
            $this->setError(Error::StatusPending);
        }

        return json_encode(['status' => $this->status, 'payload' => $this->payload]);
    }

    public function __debugInfo()
    {
        return ['status' => $this->status, 'payload' => $this->payload];
    }
}

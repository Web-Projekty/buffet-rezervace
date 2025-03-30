<?php

declare (strict_types = 1);

use Buffet\Types\ApiResponse;
use Buffet\Types\ApiStatus;
use Buffet\Types\Error;
use Buffet\Types\Success;
use PHPUnit\Framework\TestCase;

class ApiResponseTest extends TestCase
{
    private ApiResponse $apiResponse;

    protected function setUp(): void
    {
        $this->apiResponse = new ApiResponse();
    }

    public function testInitialStatus(): void
    {
        $this->assertSame(ApiStatus::Pending, $this->apiResponse->getStatus());
    }

    public function testAddPayload(): void
    {
        $this->apiResponse->addPayload('key1', 'value1');
        $this->assertSame('value1', $this->apiResponse->getPayload('key1'));
    }

    public function testSetPayload(): void
    {
        $this->apiResponse->setPayload('key1', 'value2');
        $this->assertSame('value2', $this->apiResponse->getPayload('key1'));
    }

    public function testSetError(): void
    {
        $error = Error::DefaultError;
        $this->apiResponse->setError($error);
        $this->assertTrue($this->apiResponse->hasFailed());
        $this->assertSame($error->getValue(), $this->apiResponse->getPayload('msg'));
    }

    public function testSetSuccess(): void
    {
        $success = new Success('Success message');
        $this->apiResponse->setSuccess($success);
        $this->assertFalse($this->apiResponse->hasFailed());
        $this->assertSame($success->getValue(), $this->apiResponse->getPayload('msg'));
    }

    public function testRequireRequestType(): void
    {
        $this->apiResponse->requireRequestType(true);
        $this->assertTrue($this->apiResponse->requireRequestType);
    }

    public function testSetRequestKeys(): void
    {
        $this->apiResponse->setRequestKeys(['key1', 'key2']);
        $this->assertSame(['key1', 'key2'], $this->apiResponse->getRequestKeys());
    }

    public function testSetRequestByKey(): void
    {
        $this->apiResponse->setRequestByKey('key1', 'value1');
        $this->assertSame('value1', $this->apiResponse->getRequestByKey('key1'));
    }

    public function testSetPayloadKeys(): void
    {
        $this->apiResponse->setPayloadKeys(['key1']);
        $this->assertSame(['key1'], $this->apiResponse->getPayloadKeys());
    }

    public function testHasRequestKeys(): void
    {
        $this->apiResponse->setRequestKeys(['key1']);
        $this->apiResponse->setRequestByKey('key1', 'value1');
        $this->assertTrue($this->apiResponse->hasRequestKeys());
    }

    public function testHasPayloadKeys(): void
    {
        $this->apiResponse->setPayloadKeys(['key1']);
        $this->apiResponse->addPayload('key1', 'value1');
        $this->assertTrue($this->apiResponse->hasPayloadKeys());
    }

    public function testHasFailed(): void
    {
        $error = new Error('Some error');
        $this->apiResponse->setError($error);
        $this->assertTrue($this->apiResponse->hasFailed());
    }

    public function testToStringWithError(): void
    {
        $this->apiResponse->setError(new Error('Error occurred'));
        $this->assertStringContainsString('Error occurred', $this->apiResponse->__toString());
    }

    public function testToStringWithSuccess(): void
    {
        $this->apiResponse->setSuccess(new Success('Success message'));
        $this->assertStringContainsString('Success message', $this->apiResponse->__toString());
    }

    public function testHasRequestKeysWithMissingKey(): void
    {
        $this->apiResponse->setRequestKeys(['key1']);
        $this->apiResponse->setRequestByKey('key2', 'value2');
        $this->assertFalse($this->apiResponse->hasRequestKeys());
    }

    public function testRequireRequestTypeWithMissingRequestType(): void
    {
        $this->apiResponse->requireRequestType(true);
        $this->apiResponse->setRequestKeys(['key1']);
        $this->apiResponse->setRequestByKey('key1', 'value1');
        $this->assertTrue($this->apiResponse->hasFailed());
    }

    public function testDebugInfo(): void
    {
        $this->apiResponse->setPayload('key1', 'value1');
        $debugInfo = $this->apiResponse->__debugInfo();
        $this->assertArrayHasKey('status', $debugInfo);
        $this->assertArrayHasKey('payload', $debugInfo);
    }

    public function testMissingRequestKeysException(): void
    {
        $this->apiResponse->setRequestKeys(['key1']);
        $this->apiResponse->setRequestByKey('key2', 'value2');
        $this->expectException(Exception::class);
        $this->apiResponse->hasRequestKeys();
    }
}

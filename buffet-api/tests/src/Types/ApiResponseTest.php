<?php

declare (strict_types = 1);

use Buffet\Types\ApiResponse;
use Buffet\Types\ApiStatus;
use Buffet\Types\Error;
use Buffet\Types\Settings;
use Buffet\Types\Success;
use Buffet\Utils\EnvWriter;
use Buffet\Utils\Helper;
use PHPUnit\Framework\TestCase;

class ApiResponseTest extends TestCase
{
    private ApiResponse $apiResponse;

    protected function setUp(): void
    {
        $this->apiResponse = new ApiResponse(["requestType" => "test"]);
        EnvWriter::write(Settings::IsProd, "false");
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
        $this->apiResponse->setError(Error::DefaultError);
        $this->assertTrue($this->apiResponse->hasFailed());
        $this->assertSame(Error::DefaultError->getValue(), $this->apiResponse->getPayload('msg'));
    }

    public function testSetSuccess(): void
    {
        $this->apiResponse->setSuccess(Success::DefaultSuccess);
        $this->assertFalse($this->apiResponse->hasFailed());
        $this->assertSame(Success::DefaultSuccess->getValue(), $this->apiResponse->getPayload('msg'));
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
        $this->apiResponse->setError(Error::DefaultError);
        $this->assertTrue($this->apiResponse->hasFailed());
    }

    public function testToStringWithError(): void
    {
        $this->apiResponse->setError(Error::DefaultError);
        $this->assertStringContainsString(Error::DefaultError->getValue(), $this->apiResponse->__toString());
    }

    public function testToStringWithSuccess(): void
    {
        $this->apiResponse->setSuccess(Success::DefaultSuccess);
        $this->assertStringContainsString(Success::DefaultSuccess->getValue(), $this->apiResponse->__toString());
    }

    public function testHasRequestKeysWithMissingKey(): void
    {
        EnvWriter::write(Settings::IsProd, "true");
        $this->apiResponse->setRequestKeys(['key1']);
        $this->apiResponse->setRequestByKey('key2', 'value2');
        $this->assertFalse($this->apiResponse->hasRequestKeys());
    }

    public function testRequireRequestTypeWithMissingRequestType(): void
    {
        EnvWriter::write(Settings::IsProd, "false");

        $this->apiResponse->setRequestKeys(['key1']);
        $this->apiResponse->setRequestByKey('key1', 'value1');
        $this->apiResponse->hasRequestKeys();
        $this->assertFalse($this->apiResponse->hasFailed());
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

    public function testToStringHandlesMissingRequestType(): void
    {
        $this->apiResponse->requireRequestType(true); // Make sure it's required
        $this->apiResponse->request = [];             // Simulate missing requestType
        $this->apiResponse->__toString();             // Call __toString to trigger error

        // Assert that the error for missing requestType was set
        $this->assertTrue($this->apiResponse->hasFailed());
        $this->assertEquals(Helper::getErrorResponse(Error::MissingRequestType), $this->apiResponse->__toString());
    }

    public function testToStringHandlesMissingRequestKeys(): void
    {
        EnvWriter::write(Settings::IsProd, "false");
        // Simulate a scenario where request keys are missing
        $this->expectException(Exception::class);
        $this->apiResponse->setRequestKeys(['key1']);
        $this->apiResponse->__toString(); // Call __toString to trigger error

        // Assert that the error for missing request keys was set
        $this->assertTrue($this->apiResponse->hasFailed());
        $this->assertEquals(Helper::getErrorResponse(Error::MissingRequestKeys), $this->apiResponse->__toString());
        EnvWriter::write(Settings::IsProd, "true");
    }

    public function testToStringHandlesMissingPayloadKeys(): void
    {
        // Simulate a scenario where payload keys are missing
        $this->apiResponse->setPayloadKeys(['key1']);
        $this->apiResponse->__toString(); // Call __toString to trigger error

        // Assert that the error for missing payload keys was set
        $this->assertTrue($this->apiResponse->hasFailed());
        $this->assertEquals(Helper::getErrorResponse(Error::MissingPayloadKeys), $this->apiResponse->__toString());
    }

    public function testToStringHandlesStatusPending(): void
    {
                                              // Simulate a pending status
        $this->apiResponse->__toString();     // Call __toString to trigger error

        // Assert that the error for pending status was set
        $this->assertTrue($this->apiResponse->hasFailed());
        $this->assertEquals(Helper::getErrorResponse(Error::StatusPending), $this->apiResponse->__toString());
    }

}

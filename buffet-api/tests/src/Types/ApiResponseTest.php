<?php

declare (strict_types = 1);

use Buffet\Types\ApiResponse;
use Buffet\Types\ApiStatus;
use Buffet\Types\Error;
use Buffet\Types\Settings;
use Buffet\Types\Success;
use Buffet\Utils\EnvWriter;
use Buffet\Utils\Helper;
use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

class ApiResponseTest extends TestCase
{
    private ApiResponse $apiResponse;

    protected function setUp(): void
    {
        $this->apiResponse = new ApiResponse(["requestType" => "test"]);
        EnvWriter::write(Settings::IsProd, "false");
    }

    #[TestDox("Checks that the initial status is pending")]
    public function testInitialStatus(): void
    {
        $this->assertSame(ApiStatus::Pending, $this->apiResponse->getStatus());
    }

    #[TestDox("Checks that addPayload adds payload to apiResponse")]
    public function testAddPayload(): void
    {
        $this->apiResponse->addPayload('key1', 'value1');
        $this->assertSame('value1', $this->apiResponse->getPayload('key1'));
    }

    #[TestDox("Checks that setPayload sets payload to apiResponse")]
    public function testSetPayload(): void
    {
        $this->apiResponse->setPayload('key1', 'value2');
        $this->assertSame('value2', $this->apiResponse->getPayload('key1'));
    }

    #[TestDox("Checks that setError sets the error to apiResponse")]
    public function testSetError(): void
    {
        $this->apiResponse->setError(Error::DefaultError);
        $this->assertTrue($this->apiResponse->hasFailed());
        $this->assertSame(Error::DefaultError->getValue(), $this->apiResponse->getPayload('msg'));
    }

    #[TestDox("Checks that setSuccess sets the success to apiResponse")]
    public function testSetSuccess(): void
    {
        $this->apiResponse->setSuccess(Success::DefaultSuccess);
        $this->assertFalse($this->apiResponse->hasFailed());
        $this->assertSame(Success::DefaultSuccess->getValue(), $this->apiResponse->getPayload('msg'));
    }

    #[TestDox("Checks that requireRequestType sets the flag")]
    public function testRequireRequestType(): void
    {
        $this->apiResponse->requireRequestType(true);
        $this->assertTrue($this->apiResponse->requireRequestType);
    }

    #[TestDox("Checks that setRequestKeys sets the request keys")]
    public function testSetRequestKeys(): void
    {
        $this->apiResponse->setRequestKeys(['key1', 'key2']);
        $this->assertSame(['key1', 'key2'], $this->apiResponse->getRequestKeys());
    }

    #[TestDox("Checks that setRequestByKey sets the request by key")]
    public function testSetRequestByKey(): void
    {
        $this->apiResponse->setRequestByKey('key1', 'value1');
        $this->assertSame('value1', $this->apiResponse->getRequestByKey('key1'));
    }

    #[TestDox("Checks that setPayloadKeys sets the payload keys")]
    public function testSetPayloadKeys(): void
    {
        $this->apiResponse->setPayloadKeys(['key1']);
        $this->assertSame(['key1'], $this->apiResponse->getPayloadKeys());
    }

    #[TestDox("Checks that hasRequestKeys checks if request keys are set")]
    public function testHasRequestKeys(): void
    {
        $this->apiResponse->setRequestKeys(['key1']);
        $this->apiResponse->setRequestByKey('key1', 'value1');
        $this->assertTrue($this->apiResponse->hasRequestKeys());
    }

    #[TestDox("Checks that hasPayloadKeys checks if payload keys are set")]
    public function testHasPayloadKeys(): void
    {
        $this->apiResponse->setPayloadKeys(['key1']);
        $this->apiResponse->addPayload('key1', 'value1');
        $this->assertTrue($this->apiResponse->hasPayloadKeys());
    }

    #[TestDox("Checks that hasFailed checks if the status is failed")]
    public function testHasFailed(): void
    {
        $this->apiResponse->setError(Error::DefaultError);
        $this->assertTrue($this->apiResponse->hasFailed());
    }

    #[TestDox("Checks that __toString returns the correct string for error")]
    public function testToStringWithError(): void
    {
        $this->apiResponse->setError(Error::DefaultError);
        $this->assertStringContainsString(Error::DefaultError->getValue(), $this->apiResponse->__toString());
    }

    #[TestDox("Checks that __toString returns the correct string for success")]
    public function testToStringWithSuccess(): void
    {
        $this->apiResponse->setSuccess(Success::DefaultSuccess);
        $this->assertStringContainsString(Success::DefaultSuccess->getValue(), $this->apiResponse->__toString());
    }

    #[TestDox("Checks that hasRequestKeys handles missing request key")]
    public function testHasRequestKeysWithMissingKey(): void
    {
        EnvWriter::write(Settings::IsProd, "true");
        $this->apiResponse->setRequestKeys(['key1']);
        $this->apiResponse->setRequestByKey('key2', 'value2');
        $this->assertFalse($this->apiResponse->hasRequestKeys());
    }

    #[TestDox("Checks that requireRequestType handles missing request type")]
    public function testRequireRequestTypeWithMissingRequestType(): void
    {
        EnvWriter::write(Settings::IsProd, "false");

        $this->apiResponse->setRequestKeys(['key1']);
        $this->apiResponse->setRequestByKey('key1', 'value1');
        $this->apiResponse->hasRequestKeys();
        $this->assertFalse($this->apiResponse->hasFailed());
    }

    #[TestDox("Checks that debugInfo returns the correct debug info")]
    public function testDebugInfo(): void
    {
        $this->apiResponse->setPayload('key1', 'value1');
        $debugInfo = $this->apiResponse->__debugInfo();
        $this->assertArrayHasKey('status', $debugInfo);
        $this->assertArrayHasKey('payload', $debugInfo);
    }

    #[TestDox("Checks that missing request keys throws an exception")]
    public function testMissingRequestKeysException(): void
    {
        $this->apiResponse->setRequestKeys(['key1']);
        $this->apiResponse->setRequestByKey('key2', 'value2');
        $this->expectException(Exception::class);
        $this->apiResponse->hasRequestKeys();
    }

    #[TestDox("Checks that __toString handles missing request type")]
    public function testToStringHandlesMissingRequestType(): void
    {
        $this->apiResponse->requireRequestType(true); // Make sure it's required
        $this->apiResponse->request = [];             // Simulate missing requestType
        $this->apiResponse->__toString();             // Call __toString to trigger error

        // Assert that the error for missing requestType was set
        $this->assertTrue($this->apiResponse->hasFailed());
        $this->assertEquals(Helper::getErrorResponse(Error::MissingRequestType), $this->apiResponse->__toString());
    }

    #[TestDox("Checks that __toString handles missing request keys")]
    public function testToStringHandlesMissingRequestKeys(): void
    {
        EnvWriter::write(Settings::IsProd, "true");
        // Simulate that request keys are required but missing
        $this->apiResponse->setRequestKeys(['key1']);
        $this->apiResponse->request = []; // Empty request to simulate missing keys

        // Call __toString to trigger error for missing request keys
        $this->apiResponse->__toString();

        // Assert that the error for missing request keys was set
        $this->assertTrue($this->apiResponse->hasFailed());
        $this->assertEquals(Helper::getErrorResponse(Error::MissingRequestKeys), $this->apiResponse->__toString());
    }

    #[TestDox("Checks that __toString handles missing payload keys")]
    public function testToStringHandlesMissingPayloadKeys(): void
    {
        // Simulate a scenario where payload keys are missing
        $this->apiResponse->setPayloadKeys(['key1']);
        $this->apiResponse->__toString(); // Call __toString to trigger error

        // Assert that the error for missing payload keys was set
        $this->assertTrue($this->apiResponse->hasFailed());
        $this->assertEquals(Helper::getErrorResponse(Error::MissingPayloadKeys), $this->apiResponse->__toString());
    }

    #[TestDox("Checks that __toString handles status pending")]
    public function testToStringHandlesStatusPending(): void
    {
                                          // Simulate a pending status
        $this->apiResponse->__toString(); // Call __toString to trigger error

        // Assert that the error for pending status was set
        $this->assertTrue($this->apiResponse->hasFailed());
        $this->assertEquals(Helper::getErrorResponse(Error::StatusPending), $this->apiResponse->__toString());
    }

    #[TestDox("Checks that status setter works")]
    public function testStatus(): void
    {
        $this->apiResponse->setStatus(true);
        $this->assertEquals(ApiStatus::Success, $this->apiResponse->getStatus());

        $this->apiResponse->setStatus(false);
        $this->assertEquals(ApiStatus::Failed, $this->apiResponse->getStatus());
    }

    public function testRemovePayload(): void
    {
        // Add a payload key-value pair
        $this->apiResponse->addPayload('key1', 'value1');

        // Assert that the payload has the key-value pair before removal
        $this->assertEquals('value1', $this->apiResponse->getPayload('key1'));

        // Remove the payload
        $this->apiResponse->removePayload('key1');

        // Assert that the payload no longer has the key after removal
        $this->assertNull($this->apiResponse->getPayload('key1'));
    }

    public function testRemovePayloadWhenFailedStatus(): void
    {

        // Add a payload key-value pair
        $this->apiResponse->addPayload('key1', 'value1');

        // Set the status to failed
        $this->apiResponse->setStatus(false);

        // Try to remove the payload when the status is failed
        $this->apiResponse->removePayload('key1');

        // Assert that the payload still exists, as removal is skipped when the status is failed
        $this->assertEquals('value1', $this->apiResponse->getPayload('key1'));
    }

}

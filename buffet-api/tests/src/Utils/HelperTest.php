<?php

declare (strict_types = 1);

namespace Buffet\Tests\Utils;

use Buffet\Types\Error;
use Buffet\Types\Settings;
use Buffet\Types\Success;
use Buffet\Utils\EnvWriter;
use Buffet\Utils\Helper;
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

class HelperTest extends TestCase
{
    protected function setUp(): void
    {
        // Set up environment or any necessary state
        EnvWriter::write(Settings::IsProd, "false");
    }

    /**
     * @return array<array<Error>>
     */
    public static function errorResponseProvider(): array
    {
        return [
            [Error::AlreadySubscribed],
            [Error::BadDomain],
            [Error::Corrupted],
            [Error::CorruptedOrNull],
            [Error::InvalidJson]
        ];
    }

    #[DataProvider("errorResponseProvider")]
    #[TestDox("Test getErrorResponse")]
    /**
     * @param Error $error
     */
    public function testGetErrorResponse(Error $error): void
    {
        $expected = "{\"status\":\"failed\",\"payload\":{\"msg\":\"" . $error->value . "\"}}";
        $actual = Helper::getErrorResponse($error);

        $this->assertSame($expected, $actual);
    }

    #[TestDox("Test getSuccessResponse")]
    public function testGetSuccessResponse(): void
    {
        $response = Helper::getSuccessResponse(Success::DefaultSuccess);

        $this->assertStringContainsString(Success::DefaultSuccess->value, (string) $response);

    }

    #[TestDox("Test isAdmin with valid token")]
    public function testIsAdminValidToken(): void
    {
        // Mocking response for the JWTApi and UserModel
        $mock = new MockHandler([
            new Response(200, ['Content-Type' => 'application/json'], json_encode(['sub' => 1])) // Mocked token response
        ]);

        $handlerStack = HandlerStack::create($mock);
        $client = new Client(['handler' => $handlerStack]);

                                // Simulate the `isAdmin` check by directly using the mocked client
        $token = "valid_token"; // Use a valid token
        $response = Helper::isAdmin($token);

        $this->assertTrue($response);
    }

    #[TestDox("Test isAdmin with invalid token")]
    public function testIsAdminInvalidToken(): void
    {
        // Mocking response for invalid token
        $mock = new MockHandler([
            new Response(401, ['Content-Type' => 'application/json'], json_encode(['error' => 'Invalid Token']))
        ]);

        $handlerStack = HandlerStack::create($mock);
        $client = new Client(['handler' => $handlerStack]);

                                  // Simulate the `isAdmin` check by directly using the mocked client
        $token = "invalid_token"; // Use an invalid token
        $response = Helper::isAdmin($token);

        $this->assertFalse($response);
    }

    #[TestDox("Test attachClient adds client to storage")]
    public function testAttachClientAddsClient(): void
    {
        $mockConnection = $this->createMock(StaticConnectionInterface::class);
        $storage = new \SplObjectStorage();

        Helper::attachClient($mockConnection, $storage);
        $this->assertTrue($storage->contains($mockConnection));
    }

    #[TestDox("Test isClientInStorage returns true if client is in storage")]
    public function testIsClientInStorageReturnsTrue(): void
    {
        $mockConnection = $this->createMock(StaticConnectionInterface::class);
        $storage = new \SplObjectStorage();
        $storage->attach($mockConnection);

        $this->assertTrue(Helper::isClientInStorage($mockConnection, $storage));
    }

    #[TestDox("Test removeClient removes client from storage")]
    public function testRemoveClientRemovesClient(): void
    {
        $mockConnection = $this->createMock(StaticConnectionInterface::class);
        $storage = new \SplObjectStorage();
        $storage->attach($mockConnection);

        Helper::removeClient($mockConnection, $storage);
        $this->assertFalse($storage->contains($mockConnection));
    }
}

<?php

declare (strict_types = 1);

namespace Buffet\Tests\Utils;

use Buffet\Types\Error;
use Buffet\Types\Success;
use Buffet\Utils\Helper;
use Buffet\WebSockets\Interfaces\StaticConnectionInterface;
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
    /**
     * @return mixed
     */
    public function testIsAdminValidToken(): void
    {
        // Mocking response for the JWTApi and UserModel
        $mock = new MockHandler([
            new Response(200, ['Content-Type' => 'application/json'], json_encode(['sub' => 1])) // Mocked token response
        ]);

        $handlerStack = HandlerStack::create($mock);
        $client = new Client(['handler' => $handlerStack]);

        // Mocking `isAdmin` function to return true
        $this->mockFunction('Buffet\\Utils\\HttpClient', 'post', function ($url, $data) use ($client) {
            return $client->post($url, ['body' => $data]);
        });

        $token = "valid_token"; // Use a valid token
        $this->assertTrue(Helper::isAdmin($token));
    }

    #[TestDox("Test isAdmin with invalid token")]
    /**
     * @return mixed
     */
    public function testIsAdminInvalidToken(): void
    {
        // Mocking response for invalid token
        $mock = new MockHandler([
            new Response(401, ['Content-Type' => 'application/json'], json_encode(['error' => 'Invalid Token']))
        ]);

        $handlerStack = HandlerStack::create($mock);
        $client = new Client(['handler' => $handlerStack]);

        // Mocking `isAdmin` function to simulate invalid token
        $this->mockFunction('Buffet\\Utils\\HttpClient', 'post', function ($url, $data) use ($client) {
            return $client->post($url, ['body' => $data]);
        });

        $token = "invalid_token"; // Use an invalid token
        $this->assertFalse(Helper::isAdmin($token));
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

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
}

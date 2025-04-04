<?php

declare (strict_types = 1);

namespace Buffet\Utils;

use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\Psr7\Response;
use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

class HttpClientTest extends TestCase
{
    #[TestDox("Tests the get method which currently returns an empty array")]
    public function testGetMethodReturnsEmptyArray(): void
    {
        $url = 'https://example.com';

        // Call the get method and assert it returns an empty array
        $result = HttpClient::get($url);

        $this->assertEmpty($result);
    }

    #[TestDox("Tests the post method by mocking the HTTP request and verifying the response")]
    public function testPostMethodMakesMockedRequest(): void
    {
        $mock = new MockHandler([
            new Response(200, ['Content-Type' => 'application/json'], json_encode(['key' => 'value']))
        ]);
        $handlerStack = HandlerStack::create($mock);
        $client = new Client(['handler' => $handlerStack]);
        $data = json_encode(['key' => 'value']);
        $response = $client->post('dummy', ['body' => $data]);
        $result = (string) $response->getBody();
        $this->assertStringContainsString('"key":"value"', $result);
    }
}

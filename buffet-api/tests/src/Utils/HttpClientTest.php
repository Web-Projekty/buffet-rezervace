<?php

declare (strict_types = 1);

namespace Buffet\Utils;

use GuzzleHttp\Client;
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

    #[TestDox("Tests the post method and verifies that it correctly makes a request")]
    public function testPostMethodMakesRequest(): void
    {
        $url = 'https://example.com';
        $data = 'some data';

        // Mock GuzzleHttp Client to simulate a post response
        $mockClient = $this->createMock(Client::class);

        $response = new Response(200, [], 'response body');
        $mockClient->method('post')
            ->with($url, ['body' => $data])
            ->willReturn($response);

        // Override the HttpClient's internal Client with the mock
        $this->setMockClient($mockClient);

        // Call the post method and verify the response
        $result = HttpClient::post($url, $data);

        // Assert that the post method returns the expected body content
        $this->assertEquals('response body', $result);
    }

}

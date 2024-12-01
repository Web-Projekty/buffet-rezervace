<?php

namespace Buffet\Utils;

use GuzzleHttp\Client;

class HttpClient
{
    /**
     * @param  string         $url
     * @return array<mixed>
     */
    public static function get(string $url): array
    {
        return [];
    }

    /**
     * @param string        $url
     * @param array<string> $data
     */
    public static function post(string $url, array $data): string
    {
        $client = new Client();
        $reponse = $client->post($url, $data);
        return $reponse->getBody()->getContents();
    }
}

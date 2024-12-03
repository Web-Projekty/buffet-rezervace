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
     * @param string $data
     */
    public static function post(string $url, string $data): string
    {
        $client = new Client();
        $reponse = $client->post($url, ['body' => $data]);
        return $reponse->getBody()->getContents();
    }
}

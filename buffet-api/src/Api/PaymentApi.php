<?php

declare (strict_types = 1);

namespace Buffet\Api;

use ThePay\ApiClient\TheClient;

class PaymentApi
{
    /**
     * @var TheClient
     */
    private $thePayClient;
    public function __construct()
    {
        $merchantId = '86a3eed0-95a4-11ea-ac9f-371f3488e0fa';
        $projectId = 3;
        $apiPassword = 'secret';
        $apiUrl = 'https://demo.api.thepay.cz/';
        $gateUrl = 'https://demo.gate.thepay.cz/';
        $language = 'cs';

        $theConfig = new \ThePay\ApiClient\TheConfig(
            $merchantId,
            $projectId,
            $apiPassword,
            $apiUrl,
            $gateUrl
        );

        $theConfig->setLanguage($language);

        $signatureService = new \ThePay\ApiClient\Service\SignatureService($theConfig);

        $httpClient = new \GuzzleHttp\Client();
        $requestFactory = $streamFactory = new \GuzzleHttp\Psr7\HttpFactory();

        $apiService = new \ThePay\ApiClient\Service\ApiService(
            $theConfig,
            $signatureService,
            $httpClient,
            $requestFactory,
            $streamFactory
        );

        $thePayClient = new \ThePay\ApiClient\TheClient(
            $theConfig,
            $apiService
        );

        $this->thePayClient = $thePayClient;
    }

}

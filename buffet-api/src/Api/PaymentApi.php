<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Database\Models\PaymentModel;
use Buffet\Types\PaymentMethods;
use Buffet\Types\Settings;
use Buffet\Utils\EnvReader;
use ThePay\ApiClient\Model\CreatePaymentParams;
use ThePay\ApiClient\TheClient;

class PaymentApi
{
    /**
     * @var TheClient
     */
    private TheClient $thePayClient;
    public function __construct()
    {
        $merchantId = (string) EnvReader::getEnvProperty(Settings::ThePayMerchantId);
        $projectId = (int) EnvReader::getEnvProperty(Settings::ThePayProjectId);
        $apiPassword = (string) EnvReader::getEnvProperty(Settings::ThePayApiPass);
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

    /**
     * @param int $amount
     */
    public function createPayment(int $amount, PaymentMethods $paymentMethod): int
    {
        $url = null;
        switch ($paymentMethod) {

            case PaymentMethods::ThePay:
                $currency = EnvReader::getEnvProperty(Settings::PaymentCurrency);
                $stringUid = strval(rand(0, 2147483640)); // has to be unique for each transaction
                $params = new CreatePaymentParams($amount, $currency, $stringUid);
                $params->setReturnUrl('https://wlczak.vlastas.cc/return');
                $params->setNotifUrl('https://wlczak.vlastas.cc/backend/api/notification');

                $response = $this->thePayClient->createPayment($params);
                $url = $response->getPayUrl();
                $detailsUrl = $response->getPaymentDetailUrl();
                $response->getPaymentDetailUrl();
                return PaymentModel::addPayment(paymentId: (int) $stringUid, type: $paymentMethod, useCredits: false, totalAmount: $amount, thePayUrl: $url, thePayDetailsUrl: $detailsUrl);
        }
        return 0;
    }

    /**
     * @param int $paymentId
     */
    public function getPaymentInfo(int $paymentId): void
    {
        $result = $this->thePayClient->getPayment(strval($paymentId));
        var_dump($result->getState());
        var_dump($result);
    }
}

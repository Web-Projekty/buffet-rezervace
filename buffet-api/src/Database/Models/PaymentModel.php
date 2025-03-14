<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Buffet\Api\JWTApi;
use Buffet\Types\EventTypes;
use Buffet\Types\PaymentMethods;
use Buffet\Utils\WebsocketClient;
use Illuminate\Database\Eloquent\Model;
use ThePay\ApiClient\Model\PaymentMethod;

class PaymentModel extends Model
{
    const CREATED_AT = 'dateCreated';
    const UPDATED_AT = null;
    /**
     * @var string
     */
    protected $table = 'Payments';

    /**
     * @var array<string>
     */
    protected $fillable = [
        'thePayId',
        'type',
        'useCredits',
        'totalAmount',
        'creditsAmount',
        'paid',
        'thePayUrl',
        'thePayDetailsUrl'
    ];

    /**
     * @param  PaymentMethods $type
     * @param  bool           $useCredits
     * @param  int            $totalAmount
     * @param  int            $creditsAmount
     * @param  string         $thePayUrl
     * @return int
     */
    public static function addPayment(int $paymentId, PaymentMethods $type, int $totalAmount, string $thePayUrl, string $thePayDetailsUrl, bool $useCredits = false, int $creditsAmount = 0): int
    {
        $paymentQuery = PaymentModel::query()->create([
            'thePayId' => $paymentId,
            'type' => $type->value,
            'useCredits' => $useCredits,
            'totalAmount' => $totalAmount,
            'creditsAmount' => $creditsAmount,
            'thePayUrl' => $thePayUrl,
            'thePayDetailsUrl' => $thePayDetailsUrl
        ]);
        $paymentQuery->save();
        return $paymentQuery->toArray()["id"];
    }

    /**
     * @param int $thePayId
     */
    public static function setPaid(int $thePayId): void
    {
        $paymentQuery = PaymentModel::query()->where('thePayId', $thePayId);

        //ob_start();
        #var_dump($paymentId);
        $paymentId = $paymentQuery->first()->toArray();

        $order = OrderModel::query()->where("paymentId", "=", $paymentId)->get()->toArray();
        
        //error_log(ob_get_clean());
        #error_log($orderId);
        if ($paymentQuery->get()->count() === 0) {
            throw new \Exception("Payment not found", 1);
        }
        $paymentQuery->update(['paid' => 1]);


        WebsocketClient::send("kds", json_encode(["requestType" => "publish", "token" => JWTApi::getAdminToken(), "eventType" => EventTypes::CreateOrder, "payload" => ["data"=> $order]]));
    }

    public static function getTableName(): string
    {
        return (new self())->getTable();
    }
}

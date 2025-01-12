<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Buffet\Types\PaymentMethods;
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
}

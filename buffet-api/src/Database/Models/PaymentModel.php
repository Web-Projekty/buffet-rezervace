<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Buffet\Types\PaymentMethods;
use Illuminate\Database\Eloquent\Model;
use ThePay\ApiClient\Model\PaymentMethod;

class PaymentModel extends Model
{
    /**
     * @var string
     */
    protected $table = 'payments';

    /**
     * @var array<string>
     */
    protected $fillable = [
        'type',
        'useCredits',
        'totalAmount',
        'creditsAmount',
        'paid',
        'thePayUrl'
    ];

    /**
     * @param PaymentMethods $type
     * @param bool           $useCredits
     * @param int            $totalAmount
     * @param int            $creditsAmount
     * @param string         $thePayUrl
     */
    public static function addPayment(PaymentMethods $type, int $totalAmount, string $thePayUrl, bool $useCredits = false, int $creditsAmount = 0): void
    {
        PaymentModel::query()->create([
            'type' => $type->value,
            'useCredits' => $useCredits,
            'totalAmount' => $totalAmount,
            'creditsAmount' => $creditsAmount,
            'thePayUrl' => $thePayUrl
        ]);
    }
}

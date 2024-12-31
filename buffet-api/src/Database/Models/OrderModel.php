<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Buffet\Api\OrderApi;
use Buffet\Types\OrderStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class OrderModel extends Model
{
    const CREATED_AT = 'dateCreated';
    const UPDATED_AT = null;
    // Specify the table if it's not the pluralized form of the class name
    /**
     * @var string
     */
    protected $table = 'Orders';

    // Define the columns that are mass assignable
    /**
     * @var array<string>
     */
    protected $fillable = ['userId', 'status', 'dateCreated', 'pickupDate', 'items', 'startTime', 'endTime', 'pickUpId', 'paymentMethod'];

    /**
     * @var array<string>
     */
    protected $casts = [
        'dateCreated' => 'datetime',
        'pickupDate' => 'date'
    ];

    /**
     * @var array<string>
     */
    protected $dates = ['dateCreated', 'pickupDate'];

    /**
     * @var array<string>
     */
    protected $hidden = ['id'];

    /**
     * @var array<string>
     */
    protected $visible = ['userId', 'status', 'pickupDate', 'items', 'startTime', 'endTime', 'pickUpId', 'paymentMethod'];

    /**
     * @var array<string>
     */
    protected $indexTypes = [
        'userId' => 'fulltext',
        'status' => 'fulltext',
        'dateCreated' => 'datetime',
        'pickupDate' => 'date',
        'items' => 'fulltext',
        'startTime' => 'time',
        'endTime' => 'time',
        'pickUpId' => 'string',
        'paymentMethod' => 'string'
    ];

    /**
     * @var bool
     */
    public $timestamps = true;

    public static function getAll(): bool | \Illuminate\Database\Eloquent\Collection
    {
        try {
            return OrderModel::all();
        } catch (QueryException $e) {
            return false;
        }
    }

    /**
     * @param $userId
     */
    public static function getByUser(int $userId): bool | \Illuminate\Database\Eloquent\Collection
    {
        try {
            return OrderModel::query()->where('userId', $userId)->get();
        } catch (QueryException $e) {
            return false;
        }
    }

    /**
     * @param string $from
     * @param string $to
     */
    public static function selectByDateRange(string $from, string $to): bool | \Illuminate\Support\Collection
    {
        try {
            return OrderModel::query()->getQuery()->whereDate('pickupDate', ">=", $from)->whereDate('pickupDate', "<=", $to)->orderBy('pickupDate')->get();
        } catch (QueryException $e) {

            return false;
        }
    }

    /**
     * @param int         $userId
     * @param OrderStatus $status
     * @param string      $pickupDate
     * @param string      $items
     * @param string      $paymentMethod
     * @param string      $startTime
     * @param string      $endTime
     */
    public static function createOrder(int $userId, OrderStatus $status, string $pickupDate, string $items, string $paymentMethod, string $startTime, string $endTime): void
    {
        $pickupId = OrderApi::getOrderPickupId();

        OrderModel::query()->create([
            'userId' => $userId,
            'status' => $status->value,
            'pickupDate' => $pickupDate,
            'items' => $items,
            'startTime' => $startTime,
            'endTime' => $endTime,
            'pickUpId' => $pickupId,
            'paymentMethod' => $paymentMethod
        ]);
    }
}

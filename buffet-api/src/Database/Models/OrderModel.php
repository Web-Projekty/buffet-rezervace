<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Buffet\Api\ItemApi;
use Buffet\Api\OrderApi;
use Buffet\Api\PaymentApi;
use Buffet\Types\Exceptions\PaymentCreationException;
use Buffet\Types\OrderStatus;
use Buffet\Types\PaymentMethods;
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
    public $table = 'Orders';

    // Define the columns that are mass assignable
    /**
     * @var array<string>
     */
    public $fillable = ['userId', 'status', 'dateCreated', 'pickupDate', 'items', 'startTime', 'endTime', 'pickUpId', 'useCredits', 'paymentId'];

    /**
     * @var array<string>
     */
    protected $casts = [
        'dateCreated' => 'datetime',
        'pickupDate' => 'date'
    ];

    public int $id;

    /**
     * @var array<string>
     */
    protected $dates = ['dateCreated', 'pickupDate'];

    /**
     * @var array<string>
     */
    protected $hidden = [];

    /**
     * @var array<string>
     */
    protected $visible = ['id', 'userId', 'status', 'pickupDate', 'dateCreated', 'items', 'startTime', 'endTime', 'pickUpId', 'useCredits', 'paymentId'];

    /**
     * @var array<string>
     */
    protected $indexTypes = [
        'userId' => 'int',
        'status' => 'enum',
        'dateCreated' => 'datetime',
        'pickupDate' => 'date',
        'items' => 'fulltext',
        'startTime' => 'time',
        'endTime' => 'time',
        'pickUpId' => 'string'
    ];

    /**
     * @var bool
     */
    public $timestamps = true;

    public static function getAll(): false | \Illuminate\Database\Eloquent\Builder
    {
        try {
            return OrderModel::query();
        } catch (QueryException $e) {
            return false;
        }
    }

    /**
     * @param $userId
     */
    public static function getByUser(int $userId): false | \Illuminate\Database\Eloquent\Builder
    {
        try {
            return OrderModel::query()->where('userId', $userId);
        } catch (QueryException $e) {
            return false;
        }
    }

    /**
     * @param  int            $id
     * @return array<mixed>
     */
    public static function getById(int $id): array
    {
        try {
            return OrderModel::query()->find($id)->toArray();
        } catch (QueryException $e) {
            return [];
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
     * @param  int                                                                                                                                           $userId
     * @param  OrderStatus                                                                                                                                   $status
     * @param  string                                                                                                                                        $pickupDate
     * @param  array<array{id:int,count:int,variants:array<int>}>                                                                                            $items
     * @param  string                                                                                                                                        $paymentMethod
     * @param  string                                                                                                                                        $startTime
     * @param  string                                                                                                                                        $endTime
     * @return array{userId:int,status:int,pickupDate:string,items:string,startTime:string,endTime:string,pickUpId:string,paymentMethod:string,url:string}
     */
    public static function createOrder(int $userId, OrderStatus $status, string $pickupDate, array $items, string $paymentMethod, string $startTime, string $endTime): array
    {
        $pickupId = OrderApi::getOrderPickupId();

        $paymentApi = new PaymentApi();
        $itemApi = new ItemApi;

        $price = $itemApi->countItemPrice($items);

        $paymentId = $paymentApi->createPayment($price, PaymentMethods::ThePay);
        if ($paymentId == 0) {
            throw new PaymentCreationException();
        }

        $order = OrderModel::query()->create([
            'userId' => $userId,
            'status' => $status->value,
            'pickupDate' => $pickupDate,
            'items' => json_encode($items),
            'paymentId' => $paymentId,
            'startTime' => $startTime,
            'endTime' => $endTime,
            'pickUpId' => $pickupId
        ]);

        $order->save();

        $orderArray = $order->toArray();

        $orderArray['id'] = $order->getAttribute("id");

        $orderArray['url'] = PaymentModel::query()->find($paymentId)->toArray()['thePayUrl'];
        return $orderArray;

    }

    /**
     * @return array<string>
     */
    public static function getCollumns(): array
    {
        $model = new OrderModel();
        return $model->fillable;
    }

    public static function getTableName(): string
    {
        return (new self())->getTable();
    }
}

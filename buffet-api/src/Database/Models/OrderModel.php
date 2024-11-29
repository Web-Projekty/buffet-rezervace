<?php

namespace Buffet\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class OrderModel extends Model
{
    // Specify the table if it's not the pluralized form of the class name
    /**
     * @var string
     */
    protected $table = 'Orders';

    // Define the columns that are mass assignable
    /**
     * @var array<string>
     */
    protected $fillable = ['userId', 'status', 'date', 'pickupDate', 'items'];

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
}

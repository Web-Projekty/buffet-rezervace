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
     * @var array
     */
    protected $fillable = ['userId', 'status', 'date', 'pickupDate', 'items'];

    /**
     * @var mixed
     */
    public $timestamps = true;

    public static function getAll()
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
    public static function getByUser($userId)
    {
        try {
            return OrderModel::query()->where('userId', $userId)->get();
        } catch (QueryException $e) {
            return false;
        }
    }
}

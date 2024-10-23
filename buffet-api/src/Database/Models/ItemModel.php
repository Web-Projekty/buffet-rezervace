<?php

namespace Buffet\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class ItemModel extends Model
{
    // Specify the table if it's not the pluralized form of the class name
    /**
     * @var string
     */
    protected $table = 'Items';

    // Define the columns that are mass assignable
    /**
     * @var array
     */
    protected $fillable = ['name', 'price', 'description', 'image', 'allergens'];

    /**
     * @var mixed
     */
    public $timestamps = false;

    public static function getAll()
    {
        try {
            return ItemModel::all();
        } catch (QueryException $e) {
            return false;
        }
    }
}

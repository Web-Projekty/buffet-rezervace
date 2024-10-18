<?php

namespace Buffet\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class DefaultModel extends Model
{
    // Specify the table if it's not the pluralized form of the class name
    /**
     * @var string
     */
    protected $table = 'Default';

    // Define the columns that are mass assignable
    /**
     * @var array
     */
    protected $fillable = ['stuffHere'];

    /**
     * @var mixed
     */
    public $timestamps = false;

    public static function getAll()
    {
        try {
            return DefaultModel::all();
        } catch (QueryException $e) {
            return false;
        }
    }
}

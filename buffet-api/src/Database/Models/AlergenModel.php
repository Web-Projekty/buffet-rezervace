<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class AllergenModel extends Model
{
    // Specify the table if it's not the pluralized form of the class name
    /**
     * @var string
     */
    protected $table = 'Allergens';

    // Define the columns that are mass assignable
    /**
     * @var array<string>
     */
    protected $fillable = ['name', 'description', 'image'];

    /**
     * @var bool
     */
    public $timestamps = false;

    public static function getAll(): \Illuminate\Database\Eloquent\Collection  | bool
    {
        try {
            return AllergenModel::all();
        } catch (QueryException $e) {
            return false;
        }
    }
}

<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class VariantsModel extends Model
{
    // Specify the table if it's not the pluralized form of the class name
    /**
     * @var string
     */
    protected $table = 'Variants';

    // Define the columns that are mass assignable
    /**
     * @var array<string>
     */
    protected $fillable = ['itemId', 'name', 'addedPrice', 'isExclusive'];

    // Optionally, disable timestamps if the table doesn't have them

    /**
     * @var bool
     */
    public $timestamps = false;

    public static function getAll(): \Illuminate\Database\Eloquent\Collection  | bool
    {
        try {
            return self::all();
        } catch (QueryException) {
            return false;
        }
    }

    /**
     * @param  int    $itemId
     * @param  string $name
     * @param  int    $addedPrice
     * @param  bool   $isExclusive
     * @return bool
     */
    public static function createVariant(int $itemId, string $name, int $addedPrice, bool $isExclusive): bool
    {
        try {
            self::query()->create([
                'itemId' => $itemId,
                'name' => $name,
                'addedPrice' => $addedPrice,
                'isExclusive' => $isExclusive
            ]);

        } catch (\Illuminate\Database\QueryException) {
            return false;
        }
        return true;
    }

    /**
     * @return array<string>
     */
    public static function getColums(): array
    {
        $model = new self();
        return $model->fillable;
    }

}

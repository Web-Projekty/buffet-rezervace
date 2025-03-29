<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class VariantModel extends Model
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
    protected $fillable = ['itemId', 'name', 'addedPrice', 'isExclusive', "created_at", "updated_at"];

    // Optionally, disable timestamps if the table doesn't have them

    /**
     * @var bool
     */
    public $timestamps = true;

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
            ])->save();

        } catch (\Illuminate\Database\QueryException) {
            return false;
        }
        return true;
    }

    /**
     * @param int $id
     */
    public static function exists(int $id): bool
    {
        try {
            return self::query()->where('id', '=', $id)->exists();
        } catch (\Illuminate\Database\QueryException) {
            return false;
        }
    }

    /**
     * @param array<int> $variantIds
     */
    public static function getByIdArray(array $variantIds) : Collection
    {
        $query = self::query();
        foreach ($variantIds as $variantId) {
            $query->orWhere('id', '=', $variantId);
        }

        $variants = $query->get();

        foreach ($variantIds as $itemId) {
            if (!$variants->contains("id", "=", $itemId)) {
                throw new Exception("Invalid variants", 2);
            }
        }

        if ($variants->count() != count($variantIds)) {
            throw new Exception("Invalid variants", 2);
        }

        return $query->get();
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

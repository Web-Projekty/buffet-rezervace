<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Exception;
use Illuminate\Database\Eloquent\Collection;
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
     * @var array<string>
     */
    protected $fillable = ['name', 'price', 'description', 'allergens', 'category'];

    /**
     * @var bool
     */
    public $timestamps = false;

    public static function getAll(): \Illuminate\Database\Eloquent\Collection  | bool
    {
        try {
            return ItemModel::all();
        } catch (QueryException $e) {
            return false;
        }
    }

    /**
     * @param int $page
     * @param int $itemsCount
     */
    public static function getAllByPage(int $page, int $itemsCount): bool | \Illuminate\Database\Eloquent\Collection  | \Illuminate\Support\Collection
    {
        try {
            return ItemModel::query()->offset(($page - 1) * $itemsCount)->limit($itemsCount)->get();
        } catch (QueryException $e) {
            return false;
        }
    }

    public static function countAll(): int | bool
    {
        try {
            return ItemModel::query()->count();
        } catch (QueryException $e) {
            return false;
        }
    }

    /**
     * @param array<int|int> $itemIds
     */
    public static function getByIdArray(array $itemIds): Collection
    {
        $query = ItemModel::query();
        foreach ($itemIds as $item) {
            $query->orWhere('id', '=', $item);
        }

        $items = $query->get();

        foreach ($itemIds as $itemId) {
            if (!$items->contains("id", "=", $itemId)) {
                throw new Exception("Missing items", 1);
            }
        }

        if ($items->count() != count($itemIds)) {
            throw new Exception("Missing items", 1);
        }

        return $query->get();
    }

    /**
     * @param int $itemId
     */
    public static function exists(int $itemId): bool
    {
        return ItemModel::query()->where("id", "=", $itemId)->exists();
    }

    public static function getTableName(): string
    {

        return (new self())->getTable();
    }

    /**
     * @return array<string>
     */
    public static function getCollumns(): array
    {
        return (new self)->fillable;
    }
}

<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryModel extends Model
{
    /**
     * @var string
     */
    protected $table = 'Categories';

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * @var array<string>
     */
    protected $fillable = [
        'name', 'image', 'description'
    ];

    public static function getAll(): bool | \Illuminate\Database\Eloquent\Collection
    {
        return CategoryModel::all();
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
     * @return array<string>
     */
    public static function getColums(): array
    {
        $model = new self();
        return $model->fillable;
    }
}

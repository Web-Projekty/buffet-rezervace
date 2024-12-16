<?php

namespace Buffet\Database\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryModel extends Model
{
    /**
     * @var string
     */
    protected $table = 'Categories';

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
}

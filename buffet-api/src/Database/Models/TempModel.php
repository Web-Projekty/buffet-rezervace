<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Illuminate\Database\Eloquent\Model;

class TempModel extends Model
{
    /**
     * @var string
     */
    protected $table = 'Temp';

    /**
     * @var array<string>
     */
    protected $fillable = [
        'id',
        'date',
        'startTime',
        'endTime',
        'orderLimit',
        'orderCount'
    ];

}

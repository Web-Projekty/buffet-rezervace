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
        'date',
        'startTime',
        'endTime',
        'orderLimit',
        'orderCount'
    ];
    /**
     * @param list<array<string,mixed>> $timeslots
     */
    public static function regenerate(array $timeslots): void
    {
        TempModel::query()->delete();
        TempModel::resetAutoIncrement();
        TempModel::query()->getQuery()->insert($timeslots);
    }

    public static function resetAutoIncrement(): void
    {
        TempModel::query()->getConnection()->statement('ALTER TABLE Temp AUTO_INCREMENT = 1;');
    }

    /**
     * @return array<string|int,mixed>
     */
    public static function getFormatedArray(): array
    {
        return TempModel::query()->get(['id','startTime','endTime','orderLimit','orderCount'])->groupBy('date')->toArray();
    }
}

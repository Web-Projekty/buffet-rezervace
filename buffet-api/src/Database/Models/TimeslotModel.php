<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Illuminate\Database\Eloquent\Model;

class TimeslotModel extends Model
{
    // Define table name if not following Laravel's convention
    /**
     * @var string
     */
    protected $table = 'Timeslots';

    // Disable timestamps

    /**
     * @var bool
     */
    public $timestamps = false;

    // Define fillable fields for mass assignment
    /**
     * @var array<string>
     */
    protected $fillable = ['startTime', 'endTime', 'orderLimit'];

    // Add any relationships here, e.g., belongsTo, hasMany

    /**
     * Generate timeslots based on start and end times with intervals.
     *
     * @param  list<array{startTime:string,endTime:string,orderLimit:int}> $timeslots
     * @return void
     */
    public static function generateTimeslots(array $timeslots): void
    {
        TimeslotModel::query()->getQuery()->insert($timeslots);
    }

    /**
     * @param $startTime
     * @param $endTime
     */
    public static function timeslotExists(string $startTime, string $endTime): bool
    {
        $timeslotCount = TimeslotModel::query()->where("startTime", $startTime)->where("endTime", $endTime)->getQuery()->count();
        if ($timeslotCount > 0) {
            return true;
        }
        return false;
    }

    /**
     * @param string $startTime
     * @param string $endTime
     */
    public static function getLimit(string $startTime, string $endTime): int
    {
        $limit = TimeslotModel::query()->where("startTime", $startTime)->where("endTime", $endTime)->first('orderLimit')->orderLimit;

        return $limit;
    }
}

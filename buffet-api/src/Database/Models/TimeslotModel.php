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
    protected $table = 'timeslots';

    // Define fillable fields for mass assignment
    /**
     * @var array<string>
     */
    protected $fillable = ['start_time', 'end_time', 'limit'];

    // Add any relationships here, e.g., belongsTo, hasMany

    /**
     * Generate timeslots based on start and end times with intervals.
     *
     * @param  string $startTime
     * @param  string $endTime
     * @param  int    $interval
     * @return void
     */
    public function generateTimeslots(string $startTime, string $endTime, int $interval, int $limit): void
    {

    }
}

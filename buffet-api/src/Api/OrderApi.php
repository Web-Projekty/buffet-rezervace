<?php

namespace Buffet\Api;

use Buffet\Database\Models\TimeslotModel;
use Buffet\Types\Exceptions\NegativeValueException;
use Buffet\Types\Time;
use DateException;

class OrderApi
{

    /**
     * @param string $startTime
     * @param string $endTime
     * @param int    $intervalTime
     * @param int    $limit
     */
    public function generateTimeslots(string $startTime, string $endTime, int $intervalTime, int $limit, bool $clear): void
    {
        try {
            $start = Time::fromString($startTime);
            $end = Time::fromString($endTime);

        } catch (\Exception $e) {
            throw new DateException();
        }
        if ($start->isBiggerThan($end)) {
            throw new NegativeValueException("Start time cannot be greater than end time");
        }

        $index = 0;

        if ($clear) {
            TimeslotModel::query()->delete();
        }

        while ($end->diff($start, "m") >= $limit) {
            $startString = $start->format("m");
            $start->addTime(new Time(0, $intervalTime));
            $endString = $start->format("m");

            TimeslotModel::generateTimeslots($startString, $endString, $intervalTime, $limit);

            $index++;
        }

    }

    public function generateTemp(): void
    {

    }
}

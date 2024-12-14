<?php

namespace Buffet\Api;

use Buffet\Types\Exceptions\NegativeValueException;
use DateException;
use DateInterval;
use DateTime;

class OrderApi
{

    /**
     * @param string $startTime
     * @param string $endTime
     * @param int    $intervalTime
     * @param int    $limit
     */
    public function generateTimeslots(string $startTime, string $endTime, int $intervalTime, int $limit): void
    {
        try {
            $start = DateTime::createFromFormat('H:i', $startTime);
            $end = DateTime::createFromFormat('H:i', $endTime);
            $interval = new DateInterval("PT{$intervalTime}M"); // P - period, T - time, M - minutes
        } catch (\Exception $e) {
            throw new DateException();
        }
        if ($start > $end) {
            throw new NegativeValueException("Start time cannot be greater than end time");
        }
        $i = 0;
        $diff = $start->diff($end)->i + $start->diff($end)->h * 60;
        while ($diff > $intervalTime) {
            echo ++$i;
            var_dump($diff);
            $diff -= $intervalTime;

        }
    }
}

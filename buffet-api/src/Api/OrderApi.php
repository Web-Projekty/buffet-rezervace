<?php

namespace Buffet\Api;

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
    public function generateTimeslots(string $startTime, string $endTime, int $intervalTime, int $limit): void
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

        echo $start->format("m");
        echo "\n";
        echo $end->format("m");
        echo "-------------------\n";
        $i =0 ;
        while ($end->isBiggerThan($start) && $i < 5000) {
            echo $start->format("m");
            $start->addTime(new Time(0, $intervalTime));
            echo " - ";
            echo $start->format("m");
            echo "\n";
            $i++;
        }

    }
}

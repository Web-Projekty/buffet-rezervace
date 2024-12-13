<?php

namespace Buffet\Api;

use DateException;
use DateTime;

class OrderApi
{

    /**
     * @param string $startTime
     * @param string $endTime
     * @param int    $interval
     * @param int    $limit
     */
    public function generateTimeslots(string $startTime, string $endTime, int $interval, int $limit): void
    {
        try {
            $start = DateTime::createFromFormat('H:i:s', $startTime);
            $end = DateTime::createFromFormat('H:i:s', $endTime);
        } catch (\Exception $e) {
            throw new DateException();
        }
    }
}

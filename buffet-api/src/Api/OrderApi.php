<?php

namespace Buffet\Api;

use Buffet\Database\Models\OrderModel;
use Buffet\Database\Models\TempModel;
use Buffet\Database\Models\TimeslotModel;
use Buffet\Types\Exceptions\NegativeValueException;
use Buffet\Types\Settings;
use Buffet\Types\Time;
use Buffet\Utils\EnvReader;
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
        $timeslots = [];

        while ($end->diff($start, "m") >= $limit) {
            $startString = $start->format("m");
            $start->addTime(new Time(0, $intervalTime));
            $endString = $start->format("m");

            $timeslots[] = [
                'startTime' => $startString,
                'endTime' => $endString,
                'orderLimit' => $limit
            ];

            $index++;
        }
        TimeslotModel::generateTimeslots($timeslots);
    }

    public function generateTemp(): void
    {
        $timeslots = TimeslotModel::all()->toArray();
        //var_dump($timeslots);
        $days = [];

        for ($i = 0; $i < (int) EnvReader::getEnvProperty(Settings::OrderDateLimitMax); $i++) {
            $days[] = date('Y-m-d', strtotime('+' . $i . ' days'));
        }
        //  var_dump($days);

        $firstDay = $days[0];
        $lastDay = $days[sizeof($days) - 1];

        var_dump(OrderModel::selectByDateRange($firstDay, $lastDay)->toArray());

        $tempTimeslots = [];

        foreach ($days as $day) {
            foreach ($timeslots as $timeslot) {
                $tempTimeslots[] = [
                    'date' => $day,
                    'startTime' => $timeslot['startTime'],
                    'endTime' => $timeslot['endTime'],
                    'orderLimit' => $timeslot['orderLimit'],
                    'orderCount' => 0];
            }
        }
        // var_dump($tempTimeslots);
        TempModel::regenerate($tempTimeslots);
    }
}

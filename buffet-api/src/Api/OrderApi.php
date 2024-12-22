<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Database\Models\OrderModel;
use Buffet\Database\Models\TimeslotModel;
use Buffet\Types\Exceptions\NegativeValueException;
use Buffet\Types\Settings;
use Buffet\Types\Time;
use Buffet\Utils\EnvReader;
use Carbon\Carbon;
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

        $orders = OrderModel::selectByDateRange($firstDay, $lastDay);

        //var_dump($orders->toArray());

        $tempTimeslots = [];

        $countedOrderIds = [];

        foreach ($days as $day) {
            $todaysOrders = $orders->where('pickupDate', '=', $day);
            //var_dump($todaysOrders->toArray());

            foreach ($timeslots as $timeslot) {
                $startTime = Carbon::createFromFormat('H:i:s', $timeslot["startTime"]);
                $endTime = Carbon::createFromFormat('H:i:s', $timeslot["endTime"]);

                $currentOrders = $todaysOrders->where('startTime', '<', $endTime->format('H:i:s'))->where('endTime', '>', $startTime->format('H:i:s'));//->whereNotIn('id', $countedOrderIds);

                $countedOrderIds = array_unique(array_merge($countedOrderIds, $currentOrders->pluck('id')->toArray()));
                //var_dump($countedOrderIds);

                $count = $currentOrders->count();

                $message = $day . " from " . $startTime->format('H:i:s') . " to " . $endTime->format('H:i:s') . " has " . $count . " orders";
                if ($count > 0) {
                    echo "<span style='color:red'>" . $message . "</span><br>";
                } else {
                    echo $message . "<br>";
                }

                //var_dump($currentOrders->toArray());

                $tempTimeslots[] = [
                    'date' => $day,
                    'startTime' => $timeslot['startTime'],
                    'endTime' => $timeslot['endTime'],
                    'orderLimit' => $timeslot['orderLimit'],
                    'orderCount' => 0];
            }
        }
        // var_dump($tempTimeslots);
        //TempModel::regenerate($tempTimeslots);
    }
}

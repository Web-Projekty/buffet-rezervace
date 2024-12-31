<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Database\Models\OrderModel;
use Buffet\Database\Models\TempModel;
use Buffet\Database\Models\TimeslotModel;
use Buffet\Types\Exceptions\NegativeValueException;
use Buffet\Types\Exceptions\OutOfOrderIdsException;
use Buffet\Types\OrderStatus;
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

    /**
     * @throws NegativeValueException
     */

    public function generateTemp(): void
    {
        $timeslots = TimeslotModel::all()->toArray();
        $days = [];
        $orderDateLimitMax = (int) EnvReader::getEnvProperty(Settings::OrderDateLimitMax);

        if ($orderDateLimitMax <= 1) {
            throw new NegativeValueException("Order date limit must be greater than 1");
        }
        for ($i = 0; $i < $orderDateLimitMax; $i++) {
            $days[] = date('Y-m-d', strtotime('+' . $i . ' days'));
        }

        //  var_dump($days);

        $firstDay = $days[0];
        $lastDay = $days[sizeof($days) - 1];

        $orders = OrderModel::selectByDateRange($firstDay, $lastDay);

        $tempTimeslots = [];

        //$countedOrderIds = [];

        foreach ($days as $day) {
            $todaysOrders = $orders->where('pickupDate', '=', $day);

            foreach ($timeslots as $timeslot) {
                $startTime = Carbon::createFromFormat('H:i:s', $timeslot["startTime"]);
                $endTime = Carbon::createFromFormat('H:i:s', $timeslot["endTime"]);

                $currentOrders = $todaysOrders->where('startTime', '<', $endTime->format('H:i:s'))->where('endTime', '>', $startTime->format('H:i:s')); //->whereNotIn('id', $countedOrderIds);

                //$countedOrderIds = array_unique(array_merge($countedOrderIds, $currentOrders->pluck('id')->toArray())); // i don't know why I wrote this. Its working but completely useless

                $count = $currentOrders->count();

                ### Debug output ###

                /*$message = $day . " from " . $startTime->format('H:i:s') . " to " . $endTime->format('H:i:s') . " has " . $count . " orders";
                if ($count > 0) {
                echo "<span style='color:red'>" . $message . "</span><br>";
                } else {
                echo $message . "<br>";
                }*/

                $tempTimeslots[] = [
                    'date' => $day,
                    'startTime' => $timeslot['startTime'],
                    'endTime' => $timeslot['endTime'],
                    'orderLimit' => $timeslot['orderLimit'],
                    'orderCount' => $count];
            }
        }

        TempModel::regenerate($tempTimeslots);
    }

    /**
     * @param string $startTime
     * @param string $endTime
     * @param string $date
     */
    public function isFree(string $startTime, string $endTime, string $date, int $limit): bool
    {
        $startTime = Carbon::createFromFormat('H:i', $startTime);
        $endTime = Carbon::createFromFormat('H:i', $endTime);
        $currentOrders = OrderModel::query()->where('pickupDate', '=', $date);

        $currentOrders = $currentOrders->where('startTime', '<', $endTime->format('H:i:s'))->where('endTime', '>', $startTime->format('H:i:s'));

        $count = $currentOrders->count();

        return $count < $limit;
    }

    /**
     * @return string
     */
    public static function getOrderPickupId(): string
    {

        $orders = OrderModel::query()->where("status", "=", OrderStatus::Sent)->orWhere("status", "=", OrderStatus::Preparing)->orWhere("status", "=", OrderStatus::Waiting)->orWhere("status", "=", OrderStatus::Waiting)->get();
        $counter = 0;

        if ($orders->count() > 1000) {
            throw new OutOfOrderIdsException();
        }

        do {
            $counter++;
            $randomId = random_int(0, 999);

            $randomId = str_pad(strval($randomId), 3, '0', STR_PAD_LEFT);

            $count = $orders->where("pickUpId", "=", $randomId)->count();

        } while ($count > 0);

        echo "counter: " . $counter . PHP_EOL;
        var_dump($randomId);

        return $randomId;
    }
}

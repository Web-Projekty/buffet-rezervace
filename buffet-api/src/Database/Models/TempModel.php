<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

use Buffet\Types\Settings;
use Buffet\Utils\EnvReader;
use Carbon\Carbon;
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
        if (isset($GLOBALS["is_testing"]) && $GLOBALS["is_testing"]) {
            TempModel::query()->getConnection()->statement('UPDATE sqlite_sequence SET seq = 0 WHERE name="Temp";');
        } else {
            TempModel::query()->getConnection()->statement('ALTER TABLE Temp AUTO_INCREMENT = 1;');
        }
    }

    /**
     * @return array<string|int,mixed>
     */
    public static function getFormatedArray(): array
    {
        $tempTable = TempModel::query()->get(['id', 'startTime', 'endTime', 'orderLimit', 'orderCount', 'date'])->groupBy("date")->toArray();

        //var_dump($tempTable);

        /**
         * @var array<mixed>
         */
        $out = [];
        foreach ($tempTable as $date => $tempDate) {
            $dateArray = &$out[count($out)];
            $dateArray["date"] = $date;
            $hours = [];
            $minutes = [];
            $lastHour = null;
            $hourIndex = 0;
            $availableDate = false;
            $availableHour = false;
            foreach ($tempDate as $id => $tempRow) {

                // var_dump($tempRow);
                $startTime = Carbon::createFromFormat("H:i:s", $tempRow["startTime"]);
                $endTime = Carbon::createFromFormat("H:i:s", $tempRow["endTime"]);

                if ($lastHour != $startTime->format("H") && $lastHour != null) {

                    /*$currentHour = &$hours[$hourIndex];
                    $currentHour["label"] = $lastHour . ":00";
                    $hourIndex++;*/
                    $currentHour = [
                        "label" => $lastHour . ":00",
                        "available" => $availableHour,
                        "minutes" => $minutes
                    ];
                    $minutes = [];

                    $hours[] = $currentHour;
                    $availableHour = false;
                    $lastHour = $startTime->format("H");
                }

                //$current = &$hours[$lastHour . ":00"];

                $labelStart = $startTime->format(":i");
                $labelEnd = $endTime->format(":i");

                $timeslot = [
                    "id" => $tempRow["id"],
                    "label" => $labelStart . " - " . $labelEnd,
                    "available" => ($tempRow["orderCount"] < $tempRow["orderLimit"])
                ];

                $startDateTime = Carbon::createFromFormat("Y-m-d H:i:s", $tempRow["date"] . " " . $tempRow["startTime"]);
                if ($startDateTime->subDays((int) EnvReader::getEnvProperty(Settings::OrderDateLimitMin))->isPast()) {
                    //var_dump($startTime->format("Y-m-d H:i:s"));
                    $timeslot["available"] = false;
                }

                if ($timeslot["available"]) {
                    $availableDate = true;
                    $availableHour = true;
                }

                //$hours[$startTime->format("H") . ":00"][] = $minutes;
                /*
                //$currentOut[]*/

                $minutes[] = $timeslot;
                //echo $lastHour;

                //var_dump($minutes);

                if ($lastHour == null) {
                    $lastHour = $startTime->format("H");
                }
            }
            // last pass - i just gave up trying to find the correct condition so thers some duplicate code
            $currentHour = [
                "label" => $lastHour . ":00",
                "available" => $availableHour,
                "minutes" => $minutes
            ];

            $hours[] = $currentHour;

            $dateArray["available"] = $availableDate;
            $dateArray["hours"] = $hours;
            $availableDate = false;

        }
        //var_dump($out);
        for ($i = 0; $i < sizeof($out); $i++) {
            if ($out[$i]["available"] == false) {
                unset($out[$i]);
                //var_dump($value);
            }
        }
        $out = array_values($out);
        //var_dump($out);
        return $out;

        /*
    {
    "date":"....",
    "available":true,
    "hours":[
    {
    "label":"10:00",
    "available":false,
    "minutes":[
    {
    "label":":00 - :05",
    "available":true
    },
    {
    "label":":10 - :15",
    "available":true
    },
    {
    "label":":20 - :25",
    "available":true
    },
    {
    "label":":30 - :35",
    "available":true
    }
    ]
    }
    ]
    }
     */
    }

    public static function isOutdated(): bool
    {
        $firstDate = TempModel::query()->first(["date"]);
        if ($firstDate == null) {
            return true;
        } else {
            $firstDate = $firstDate->toArray()["date"];
            if (!isset($firstDate)) {
                return true;
            } else {
                $now = Carbon::now()->format("Y-m-d");
                if ($firstDate != $now) {
                    return true;
                }
            }

        }
        return false;
    }
}

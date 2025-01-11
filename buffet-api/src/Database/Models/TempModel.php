<?php

declare (strict_types = 1);

namespace Buffet\Database\Models;

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
        TempModel::query()->getConnection()->statement('ALTER TABLE Temp AUTO_INCREMENT = 1;');
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
            $availableDate = false;
            $availableHour = false;
            $lastHour = null;
            $hourIndex = 0;
            //var_dump($out);
            foreach ($tempDate as $id => $tempRow) {

                // var_dump($tempRow);
                $startTime = Carbon::createFromFormat("H:i:s", $tempRow["startTime"]);

                //$current = &$hours[$lastHour . ":00"];

                $minutes = [
                    "id" => $tempRow["id"],
                    "start" => $tempRow["startTime"],
                    "end" => $tempRow["endTime"],
                    "available" => ($tempRow["orderCount"] < $tempRow["orderLimit"])
                ];

                //$hours[$startTime->format("H") . ":00"][] = $minutes;
                /*
                //$currentOut[]*/

                if ($lastHour != $startTime->format("H") || $lastHour == null) {
                    $lastHour = $startTime->format("H");
                    /*$currentHour = &$hours[$hourIndex];
                    $currentHour["label"] = $lastHour . ":00";

                    $hourIndex++;*/
                    $currentHour = [
                        "label" => $lastHour . ":00",
                        "available" => false,
                        "minutes" => []
                    ];

                    $hours[] = $currentHour;
                }
            }
            $dateArray["available"] = false;
            $dateArray["hours"] = $hours;

        }

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
}

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
        foreach ($tempTable as $key => $tempDate) {
            foreach ($tempDate as $id => $tempRow) {
               // var_dump($tempRow);
                $startTime = Carbon::createFromFormat("H:i:s", $tempRow["startTime"]);

                $currentOut = &$out[$key][$startTime->format("H") . ":00"];

                $array = [
                    "id" => $tempRow["id"],
                    "start" => $tempRow["startTime"],
                    "end"=> $tempRow["endTime"],
                    "available"=> ($tempRow["orderCount"] < $tempRow["orderLimit"])
                ];

                $currentOut[] = $array;

                //$currentOut[]
            }
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

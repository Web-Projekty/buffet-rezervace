<?php

declare (strict_types = 1);

namespace Buffet\Types;

use Buffet\Types\Exceptions\NegativeValueException;
use DateException;

class Time
{
    /**
     * @param int $hour
     * @param int $minute
     * @param int $second
     */
    public function __construct(public int $hour, public int $minute, public int $second = 0)
    {
        $this->fixFormat();
    }

    /**
     * @param int $hour
     * @param int $minute
     * @param int $second
     */
    public function setTime(int $hour = 0, int $minute = 0, int $second = 0): void
    {
        if ($hour < 0 || $minute < 0 || $second < 0) {
            throw new NegativeValueException();
        }

        $this->hour = $hour;
        $this->minute = $minute;
        $this->second = $second;

        if ($hour > 23 || $minute > 59 || $second > 59) {
            $this->fixFormat();
        }
    }

    /**
     * @param int $hour
     * @param int $minutes
     * @param int $seconds
     */
    public function add(int $hour = 0, int $minutes = 0, int $seconds = 0): void
    {
        $this->hour += $hour;
        $this->minute += $minutes;
        $this->second += $seconds;

        $this->fixFormat();
    }

    /**
     * @param Time $time
     */
    public function addTime(Time $time): void
    {
        $this->hour += $time->hour;
        $this->minute += $time->minute;
        $this->second += $time->second;

        $this->fixFormat();
    }

    /**
     * returns complete time in specified unit
     * s - seconds
     * m - minutes
     * h - hours
     * @param string $unit
     */
    public function getValue(string $unit): int
    {
        switch ($unit) {
            case "s":
                return $this->second + $this->minute * 60 + $this->hour * 3600;
            case "m":
                return $this->minute + $this->hour * 60;
            case "h":
                return $this->hour;
            default:
                return 0;
        }
    }

    /**
     * @param string $lastUnit
     */
    public function format(string $lastUnit): string
    {
        $hour = str_pad((string) $this->hour, 2, '0', STR_PAD_LEFT);
        $minute = str_pad((string) $this->minute, 2, '0', STR_PAD_LEFT);
        $second = str_pad((string) $this->second, 2, '0', STR_PAD_LEFT);

        switch ($lastUnit) {
            case "s":
                return "{$hour}:{$minute}:{$second}";
            case "m":
                return "{$hour}:{$minute}";
            case "h":
                return "{$hour}";
        }

        return "{$hour}:{$minute}:{$second}";
    }

    /**
     * @param  Time   $time
     * @return bool
     */
    public function isBiggerThan(Time $time): bool
    {
        return $this->getValue("s") > $time->getValue("s");
    }

    /**
     * @param  Time   $time
     * @return bool
     */
    public function isSmallerThan(Time $time): bool
    {
        return $this->getValue("s") < $time->getValue("s");
    }

    /**
     * @param  Time   $time
     * @param  string $unit
     * @return int
     */
    public function diff(Time $time, string $unit): int
    {
        $hour = $this->hour - $time->hour;
        $minute = $this->minute - $time->minute;
        $second = $this->second - $time->second;

        switch ($unit) {
            case "s":
                return $second + $minute * 60 + $hour * 3600;
            case "m":
                return $minute + $hour * 60;
            case "h":
                return $hour;
            default:
                return 0;
        }

    }

    public function __toString()
    {
        return "{$this->hour}:{$this->minute}:{$this->second}";
    }

    public function fixFormat(): void
    {
        if ($this->second > 59) {
            $this->minute += (int) floor($this->second / 60);
            $this->second %= 60;
        } elseif ($this->second < 0) {
            $this->minute += (int) floor($this->second / 60) - 1;
            $this->second = 60 + ($this->second % 60);
        }
        if ($this->minute > 59) {
            $this->hour += (int) floor($this->minute / 60);
            $this->minute %= 60;
        } elseif ($this->minute < 0) {
            $this->hour += (int) floor($this->minute / 60) - 1;
            $this->minute = 60 + ($this->minute % 60);
        }
        if ($this->hour > 23) {
            $this->hour %= 24;
        } elseif ($this->hour < 0) {
            $this->hour = 24 + ($this->hour % 24);
        }
    }

    /**
     * @param string $time
     */
    public static function fromString(string $time): Time
    {
        $time = explode(":", $time);
        if (sizeof($time) == 1) {
            throw new DateException();
        }
        if (sizeof($time) === 2) {
            return new Time((int) $time[0], (int) $time[1]);
        }
        return new Time((int) $time[0], (int) $time[1], (int) $time[2]);
    }
}

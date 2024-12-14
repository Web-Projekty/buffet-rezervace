<?php

namespace Buffet\Types;

use Buffet\Types\Exceptions\NegativeValueException;

class Time
{
    /**
     * @param int $hour
     * @param int $minute
     * @param int $second
     */
    public function __construct(public int $hour, public int $minute, public int $second = 0)
    {
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

    public function __toString()
    {
        return "{$this->hour}:{$this->minute}:{$this->second}";
    }

    public function fixFormat(): void
    {
        if ($this->second > 59) {
            $this->minute = (int) floor($this->second / 60);
            $this->second %= 60;
        }
        if ($this->minute > 59) {
            $this->hour = (int) floor($this->minute / 60);
            $this->minute %= 60;
        }
        if ($this->hour > 23) {
            $this->hour %= 24;
        }

    }
}

<?php

declare (strict_types = 1);

namespace Buffet\Types\Tests;

use Buffet\Types\Exceptions\NegativeValueException;
use Buffet\Types\Time;
use PHPUnit\Framework\TestCase;

class TimeTest extends TestCase
{
    public function testConstructorAndFixFormat(): void
    {
        $time = new Time(23, 59, 61);
        $this->assertEquals(0, $time->hour);
        $this->assertEquals(0, $time->minute);
        $this->assertEquals(1, $time->second);
    }

    public function testSetTimeWithNegativeValueThrowsException(): void
    {
        $this->expectException(NegativeValueException::class);
        $time = new Time(0, 0, 0);
        $time->setTime(-1, 0, 0);
    }

    public function testAdd(): void
    {
        $time = new Time(1, 59, 30);
        $time->add(0, 0, 45);
        $this->assertEquals(2, $time->hour);
        $this->assertEquals(0, $time->minute);
        $this->assertEquals(15, $time->second);
    }

    public function testAddTime(): void
    {
        $time1 = new Time(2, 30, 30);
        $time2 = new Time(1, 40, 40);
        $time1->addTime($time2);
        $this->assertEquals(4, $time1->hour);
        $this->assertEquals(11, $time1->minute);
        $this->assertEquals(10, $time1->second);
    }

    public function testGetValue(): void
    {
        $time = new Time(1, 1, 1);
        $this->assertEquals(3661, $time->getValue('s'));
        $this->assertEquals(61, $time->getValue('m'));
        $this->assertEquals(1, $time->getValue('h'));
    }

    public function testFormat(): void
    {
        $time = new Time(3, 5, 7);
        $this->assertEquals('03:05:07', $time->format('s'));
        $this->assertEquals('03:05', $time->format('m'));
        $this->assertEquals('03', $time->format('h'));
    }

    public function testIsBiggerThanAndIsSmallerThan(): void
    {
        $time1 = new Time(2, 0, 0);
        $time2 = new Time(1, 59, 59);
        $this->assertTrue($time1->isBiggerThan($time2));
        $this->assertFalse($time1->isSmallerThan($time2));
    }

    public function testDiff(): void
    {
        $time1 = new Time(3, 30, 30);
        $time2 = new Time(2, 15, 15);
        $this->assertEquals(75, $time1->diff($time2, 'm'));
        $this->assertEquals(1, $time1->diff($time2, 'h'));
        $this->assertEquals(4515, $time1->diff($time2, 's'));
    }

    public function testFromString(): void
    {
        $time = Time::fromString("12:34:56");
        $this->assertEquals(12, $time->hour);
        $this->assertEquals(34, $time->minute);
        $this->assertEquals(56, $time->second);

        $time2 = Time::fromString("12:34");
        $this->assertEquals(12, $time2->hour);
        $this->assertEquals(34, $time2->minute);
        $this->assertEquals(0, $time2->second);
    }

    public function testToString(): void
    {
        $time = new Time(8, 5, 5);
        $this->assertEquals('8:5:5', (string) $time);
    }
}

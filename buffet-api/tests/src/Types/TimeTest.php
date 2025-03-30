<?php

declare (strict_types = 1);

namespace Buffet\Types\Tests;

use Buffet\Types\Exceptions\NegativeValueException;
use Buffet\Types\Time;
use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

class TimeTest extends TestCase
{
    #[TestDox("Test constructor and fixFormat method")]
    public function testConstructorAndFixFormat(): void
    {
        $time = new Time(23, 59, 61);
        $this->assertEquals(0, $time->hour);
        $this->assertEquals(0, $time->minute);
        $this->assertEquals(1, $time->second);
    }

    #[TestDox("Test setTime with negative value throws exception")]
    public function testSetTimeWithNegativeValueThrowsException(): void
    {
        $this->expectException(NegativeValueException::class);
        $time = new Time(0, 0, 0);
        $time->setTime(-1, 0, 0);
    }

    #[TestDox("Test add method")]
    public function testAdd(): void
    {
        $time = new Time(1, 59, 30);
        $time->add(0, 0, 45);
        $this->assertEquals(2, $time->hour);
        $this->assertEquals(0, $time->minute);
        $this->assertEquals(15, $time->second);
    }

    #[TestDox("Test addTime method")]
    public function testAddTime(): void
    {
        $time1 = new Time(2, 30, 30);
        $time2 = new Time(1, 40, 40);
        $time1->addTime($time2);
        $this->assertEquals(4, $time1->hour);
        $this->assertEquals(11, $time1->minute);
        $this->assertEquals(10, $time1->second);
    }

    #[TestDox("Test getValue method")]
    public function testGetValue(): void
    {
        $time = new Time(1, 1, 1);
        $this->assertEquals(3661, $time->getValue('s'));
        $this->assertEquals(61, $time->getValue('m'));
        $this->assertEquals(1, $time->getValue('h'));
    }

    #[TestDox("Test format method")]
    public function testFormat(): void
    {
        $time = new Time(3, 5, 7);
        $this->assertEquals('03:05:07', $time->format('s'));
        $this->assertEquals('03:05', $time->format('m'));
        $this->assertEquals('03', $time->format('h'));
    }

    #[TestDox("Test isBiggerThan and isSmallerThan methods")]
    public function testIsBiggerThanAndIsSmallerThan(): void
    {
        $time1 = new Time(2, 0, 0);
        $time2 = new Time(1, 59, 59);
        $this->assertTrue($time1->isBiggerThan($time2));
        $this->assertFalse($time1->isSmallerThan($time2));
    }

    #[TestDox("Test diff method")]
    public function testDiff(): void
    {
        $time1 = new Time(3, 30, 30);
        $time2 = new Time(2, 15, 15);
        $this->assertEquals(75, $time1->diff($time2, 'm'));
        $this->assertEquals(1, $time1->diff($time2, 'h'));
        $this->assertEquals(4515, $time1->diff($time2, 's'));
    }

    #[TestDox("Test fromString method")]
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

    #[TestDox("Test __toString method")]
    public function testToString(): void
    {
        $time = new Time(8, 5, 5);
        $this->assertEquals('8:5:5', (string) $time);
    }

    #[TestDox("Test setTime with fixFormat method")]
    public function testSetTimeFixFormat(): void
    {
        $time = new Time(0, 0, 0);
        $time->setTime(25, 70, 80);
        $this->assertEquals(2, $time->hour);
        $this->assertEquals(11, $time->minute);
        $this->assertEquals(20, $time->second);
    }

    #[TestDox("Test getValue with default unit")]
    public function testGetValueDefault(): void
    {
        $time = new Time(1, 2, 3);
        $this->assertEquals(0, $time->getValue("invalid"));
    }

    #[TestDox("Test format with default return")]
    public function testFormatDefaultReturn(): void
    {
        $time = new Time(9, 8, 7);
        $this->assertEquals("09:08:07", $time->format("invalid"));
    }

    #[TestDox("Test diff with default return")]
    public function testDiffDefaultReturn(): void
    {
        $time1 = new Time(5, 30, 15);
        $time2 = new Time(3, 20, 10);
        $this->assertEquals(0, $time1->diff($time2, "invalid"));
    }

    #[TestDox("Test fixFormat with negative values")]
    public function testFixFormatNegativeValues(): void
    {
        $time = new Time(0, 1, -75);
        $this->assertEquals(22, $time->hour);
        $this->assertEquals(58, $time->minute);
        $this->assertEquals(45, $time->second);

        $time = new Time(0, -90, 0);
        $this->assertEquals(21, $time->hour);
        $this->assertEquals(30, $time->minute);
        $this->assertEquals(0, $time->second);

        $time = new Time(-26, 0, 0);
        $this->assertEquals(22, $time->hour);
        $this->assertEquals(0, $time->minute);
        $this->assertEquals(0, $time->second);
    }
}

<?php

declare (strict_types = 1);

namespace Buffet\Types\Exceptions;

use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

class PaymentCreationExceptionTest extends TestCase
{
    #[TestDox("Checks that the exception is correctly instantiated with default values")]
    public function testPaymentCreationExceptionWithDefaultValues(): void
    {
        $exception = new PaymentCreationException();

        $this->assertInstanceOf(PaymentCreationException::class, $exception);
        $this->assertEquals("Payment creation failed", $exception->getMessage());
        $this->assertEquals(0, $exception->getCode());
    }

    #[TestDox("Checks that the exception is correctly instantiated with a custom message and code")]
    public function testPaymentCreationExceptionWithCustomMessageAndCode(): void
    {
        $message = "Custom error message";
        $code = 100;

        $exception = new PaymentCreationException($message, $code);

        $this->assertInstanceOf(PaymentCreationException::class, $exception);
        $this->assertEquals($message, $exception->getMessage());
        $this->assertEquals($code, $exception->getCode());
    }

    #[TestDox("Checks that the exception correctly stores and retrieves a previous exception")]
    public function testPaymentCreationExceptionWithPreviousException(): void
    {
        $previousException = new \Exception("Previous exception");

        $exception = new PaymentCreationException("Custom error message", 100, $previousException);

        $this->assertInstanceOf(PaymentCreationException::class, $exception);
        $this->assertEquals("Custom error message", $exception->getMessage());
        $this->assertEquals(100, $exception->getCode());
        $this->assertSame($previousException, $exception->getPrevious());
    }

    #[TestDox("Checks the exception's string representation")]
    public function testPaymentCreationExceptionToString(): void
    {
        $exception = new PaymentCreationException("Custom error message", 100);

        $expectedString = "Buffet\\Types\\Exceptions\\PaymentCreationException: [100]: Custom error message\n";
        $this->assertEquals($expectedString, (string) $exception);
    }
}

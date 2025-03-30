<?php

declare (strict_types = 1);

namespace Buffet\Types\Exceptions;

use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

class SettingsExceptionTest extends TestCase
{
    #[TestDox("Checks that the SettingsException is correctly instantiated and logs the message")]
    public function testSettingsExceptionWithMessage(): void
    {
        $message = "Custom settings error message";

        // Ensure the exception is correctly instantiated
        $this->assertInstanceOf(SettingsException::class, (new SettingsException($message)));
    }

    #[TestDox("Checks that SettingsException inherits from the base Exception class")]
    public function testSettingsExceptionIsInstanceOfException(): void
    {
        $message = "Custom settings error message";

        $exception = new SettingsException($message);

        $this->assertInstanceOf(\Exception::class, $exception);
    }
}

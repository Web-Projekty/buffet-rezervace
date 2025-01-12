<?php

declare (strict_types = 1);

namespace Buffet\Types\Exceptions;

class SettingsException extends \Exception
{
    public function __construct(string $message)
    {
        error_log($message);
    }
}

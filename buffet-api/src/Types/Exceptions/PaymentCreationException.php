<?php

declare (strict_types = 1);

namespace Buffet\Types\Exceptions;

use Exception;

class PaymentCreationException extends Exception
{
    /**
     * @param $message
     * @param $code
     * @param Exception  $previous
     */
    public function __construct(string $message = "Payment creation failed", int $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public function __toString()
    {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }
}

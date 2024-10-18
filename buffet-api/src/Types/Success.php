<?php

declare (strict_types = 1);

namespace Buffet\Types;

enum Success: string {
    ############################ Api ############################
    // api methods

    ############################ Auth ############################
    // registration
    case Registration = 'Registered successfully';

    // login
    case Login = 'Logged in successfully';

    // JWT
    case Verification = 'Token verified succesfully';

    /**
     * @return string
     */
    public function getValue(): string
    {
        if ($this->isProd()) {
            return "Api call finished successfully";
        }
        return $this->value;
    }

    /**
     * @return bool
     */
    private function isProd(): bool
    {
        $isProd = false;
        return $isProd;
    }
}

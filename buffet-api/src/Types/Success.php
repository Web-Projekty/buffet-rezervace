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

    ############################ Channels ############################
    case ChannelConnected = 'Channel connected successfully';
    
    /**
     * @return string
     */
    public function getValue(): string
    {
        if ($this->isProd()) {
            return "Api call finished successfully";
        }
        return $this->value ?? "Api call finished successfully (missing success message)";
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

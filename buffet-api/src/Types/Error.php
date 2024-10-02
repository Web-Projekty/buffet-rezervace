<?php

declare (strict_types = 1);

namespace Buffet\Types;

enum Error: string {
    ############################ Api ############################
    // api methods
    case NonExistentMethod = 'Tried to call a non-existent api method';
    case StatusPending = 'Status is still pending';
    case InvalidDataType = 'Handling api call resulted in invalid data type';
    // api keys
    case MissingRequestKeys = 'Some or all of the request kays have been left undefined';
    case MissingPayloadKeys = 'Some or all of the payload kays have been left undefined';

    ############################ Auth ############################
    // registration
    case UserInUse = 'Username is in use';

    // login
    case LoginFailed = 'Failed to login';

    /**
     * @return string
     */
    public function getValue(): string
    {
        if ($this->isProd()) {
            return "Oops something has gone wrong";
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

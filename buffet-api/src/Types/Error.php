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
    case NonexistentUser = 'User doesn\'t exist';
    case WrongPassword = 'Wrong password';

    // JWT

    case BadDomain = "This JWT has been generated for a different domain";
    case TooEarly = "Used token before it's designated usage period";
    case TokenExpired = "This token has expired";
    case TamperedSign = "Token signature or data have been tampered with";
    case Corrupted = "Token's data have been corrupted";
    case CorruptedOrNull = "Token's data have been corrupted or are null";
    case UnexpectedValue = "Token value is unexpected";

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

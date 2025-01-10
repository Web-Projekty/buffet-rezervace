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
    case MissingRequestKeys = 'Some or all of the request keys have been left undefined';
    case MissingPayloadKeys = 'Some or all of the payload keys have been left undefined';
    case MissingRequestType = 'Api request type is missing';
    case InvalidJson = 'Invalid JSON format';

    ############################ Auth ############################
    // credManager
    case NoEnv = 'The enviromental variable for credManager is corrupted or missing';
    case FailedDecrypt = 'Failed decryption of database credentials';

    // registration
    case UserInUse = 'Username is in use';
    case RegistrationFailed = 'Could\'t register the user';
    case InvalidEmail = 'Email is invalid';
    case PasswordMismatch = 'Password and its confirmation don\'t match';
    case EmailInUse = 'Email is in use';

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
    case MissingToken = "Token is missing";

    // Admin status
    case Unauthorized = "User does not have appropriate permissions";
    case CannotOrderAsAdmin = "Admins cannot order";

    ############################ Database ############################
    case QueryFailed = 'Query from database has failed';
    case OrderIdNotFound = 'Order id not found';

    ############################ Ws Channels ############################
    case NonexistentChannel = 'Channel doesn\'t exist';
    case AlreadySubscribed = 'User is already subscribed to this channel';
    case OrderTimeslotsFull = 'Order timeslots are full';
    case NonexistentTimeslot = 'Timeslot doesn\'t exist';
    case OutOfOrderIds = 'There are no more order ids available';

    ############################ Orders ############################
    case DateTimeInvalid = 'Date or time is invalid';
    case InvalidLimitOrInterval = 'Limit or interval is invalid';
    case InvalidStatus = 'Status is invalid';
    case UserNotFound = 'User not found';
    case InvalidPickupId = 'Pickup id is invalid';

    ############################ Settings ############################
    case InvalidOrderDateLimitMax = 'Order date limit max is invalid';
    case SettingsError = 'Settings error';

    ############################ General ############################
    case GeneralError = 'Oops something has gone wrong';
    /**
     * @return string
     */
    public function getValue(): string
    {
        if ($this->isProd()) {
            return "Oops something has gone wrong";
        }
        return $this->value ?? "Oops something has gone wrong (missing error message)";
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

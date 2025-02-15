<?php

declare (strict_types = 1);

namespace Buffet\Types;

enum Success: string {
    ############################ Api ############################
    // api methods
    case GenerateTimeslots = 'Timeslots generated successfully';

    case GenerateTemp = 'Temp generated successfully';
    ############################ Auth ############################
    // registration
    case Registration = 'Registered successfully';

    // login
    case Login = 'Logged in successfully';

    // JWT
    case Verification = 'Token verified succesfully';

    // Update user
    case UserUpdated = 'User updated successfully';
    case PasswordUpdated = 'Password updated successfully';

    ############################ Settings ############################
    case SettingUpdated = 'Setting updated successfully';

    ############################ Orders ############################
    case OrderCreated = 'Order created successfully';
    case OrderUpdated = 'Order updated successfully';

    ############################ Items ############################
    case ItemUpdated = 'Item updated successfully';
    case ItemCreated = 'Item created successfully';
    case ItemDeleted = 'Item deleted successfully';

    ############################ Channels ############################
    case ChannelConnected = 'Channel connected successfully';
    case Subscribed = 'Subscribed successfully';

    ############################ ThePay ############################
    case PaymentUpdated = 'Payment created successfully';
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

<?php

declare (strict_types = 1);

namespace Buffet\Types;

use Buffet\Utils\EnvReader;

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
    case PasswordVerified = 'Password verified successfully';

    ############################ Settings ############################
    case SettingUpdated = 'Setting updated successfully';

    ############################ Orders ############################
    case OrderCreated = 'Order created successfully';
    case OrderUpdated = 'Order updated successfully';

    ############################ Items ############################
    case ItemUpdated = 'Item updated successfully';
    case ItemCreated = 'Item created successfully';
    case ItemRemoved = 'Item removed successfully';

    ############################ Variants ############################
    case VariantCreated = 'Variant created successfully';
    case VariantUpdated = 'Variant updated successfully';
    case VaraintRemoved = 'Variant removed successfully';

    ############################ Categories ############################
    case CategoryCreated = 'Category created successfully';
    case CategoryRemoved = 'Category removed successfully';
    case CategoryUpdated = 'Category updated successfully';

    ############################ Channels ############################
    case ChannelConnected = 'Channel connected successfully';
    case Subscribed = 'Subscribed successfully';

    ############################ ThePay ############################
    case PaymentUpdated = 'Payment created successfully';

    ############################ Images ############################
    case ImageUploaded = 'Image uploaded successfully';

    ############################ Default ############################
    case DefaultSuccess = 'Api call finished successfully';
    /**
     * @return string
     */
    public function getValue(): string
    {
        if ($this->isProd()) {
            return self::DefaultSuccess->value;
        }
        return $this->value ?? "Api call finished successfully (missing success message)";
    }

    /**
     * @return bool
     */
    private function isProd(): bool
    {
        $isProd = EnvReader::getEnvProperty(Settings::IsProd);
        return $isProd;
    }
}

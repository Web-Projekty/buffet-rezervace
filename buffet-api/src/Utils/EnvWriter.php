<?php

declare (strict_types = 1);

namespace Buffet\Utils;

use Buffet\Types\Settings;

require __DIR__ . '/../../vendor/autoload.php';

class EnvWriter
{
    private static string $envPath = __DIR__ . "/../../conf/.env";

    /**
     * @param Settings $key
     * @param string   $value
     */
    public static function write(Settings $key, string $value): void
    {
        if (!file_exists(self::$envPath)) {
            EnvReader::createEnv();
        }
        if (!$envContent = file_get_contents(self::$envPath)) {
            return;
        }

        if (preg_match('/^' . preg_quote((string) $key->value, '/') . '=/m', $envContent)) {
            $envContent = preg_replace(
                '/^' . preg_quote((string) $key->value, '/') . '=.*/m',
                (string) $key->value . "=$value",
                $envContent
            );
        } else {
            $envContent .= PHP_EOL . (string) $key->value . "=$value";
        }

        file_put_contents(self::$envPath, $envContent);
    }
}

<?php

namespace Buffet\Utils;

use Buffet\Types\Settings;

class EnvReader
{

    private static string $envPath = __DIR__ . "/../../conf/.env";

    /**
     * @param Settings $needle
     */
    public static function getEnvProperty(Settings $needle): string | null
    {
        if (!file_exists(self::$envPath)) {
            self::createEnv();
        }
        if (!$envContent = file_get_contents(self::$envPath)) {
            return null;
        }

        $lines = explode("\n", $envContent);

        foreach ($lines as $line) {
            $line = explode("=", $line);
            $key = trim($line[0]);
            $value = trim($line[1]);

            if ($needle->value == $key && $value != "") {
                return $value;
            }
            return null;
        }
    }

    public static function createEnv(): void
    {

        $env = fopen(self::$envPath, "w+");

        $settings = Settings::cases();

        foreach ($settings as $setting) {
            fwrite($env, $setting->value . "=" . "\n");
        }

        fclose($env);
    }
}

<?php

declare (strict_types = 1);

namespace Buffet\Utils;

use Buffet\Types\Exceptions\SettingsException;
use Buffet\Types\Settings;

require __DIR__ . '/../../vendor/autoload.php';

class EnvReader
{

    private static string $envPath = __DIR__ . "/../../conf/.env";

    /**
     * @param  Settings            $needle
     * @param  bool                $returnEmpty
     * @throws SettingsException
     */
    public static function getEnvProperty(Settings $needle, bool $returnEmpty = false): string | bool | null
    {
        if (!file_exists(self::$envPath)) {
            self::createEnv();
        }
        if (!$envContent = file_get_contents(self::$envPath)) {
            self::createEnv();
            return null;
        }

        $lines = explode("\n", $envContent);

        foreach ($lines as $line) {
            $line = explode("=", $line);
            $key = trim($line[0]);

            $value = trim($line[1] ?? "");

            if ($needle->value == $key && ($value != "" || $returnEmpty)) {
                if ($value == "true") {
                    return true;
                }
                if ($value == "false") {
                    return false;
                }
                if ($value == "") {
                    return null;
                }
                return $value;
            }
        }
        self::createEnv();
        var_dump("missing." . $needle->value);
        throw new SettingsException("The key " . $needle->value . " does not exist in the env file");
    }

    public static function createEnv(): void
    {

        $env = fopen(self::$envPath, "w+");

        $settings = Settings::cases();

        foreach ($settings as $setting) {
            fwrite($env, $setting->value . "=" . "\n");
        }

        fclose($env);

        chmod(self::$envPath, 0777);

    }
}

//var_dump(EnvReader::getEnvProperty(Settings::IsProd));

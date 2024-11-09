<?php

declare (strict_types = 1);

namespace Buffet\Tests;

class EnvSetup
{
    public string $envDir = __DIR__ . "/../src/Database/";
    public string $envPath;

    public string $envContent = "DECRYPT_KEY=a_key";
    protected bool $returnOriginalEnv = false;

    public function __construct()
    {
        $this->envPath = $this->envDir . ".env";
    }

    /**
     * @return int
     */

    public function setupDummyEnv(): void
    {
        $fileContent = $this->envContent;
        // Set up a mock .env environment for testing
        if (file_exists($this->envPath)) {
            $this->returnOriginalEnv = true;
            copy($this->envPath, __DIR__ . "/temp.env");
        } else {
            if ($env = fopen($this->envPath, "w")) {
                fwrite($env, $this->$fileContent);
                fclose($env);
            }
        }
    }

    public function cleanupDummyEnv(): void
    {
        unlink($this->envPath);
        if ($this->returnOriginalEnv) {
            copy(__DIR__ . "/temp.env", $this->envPath);
            unlink(__DIR__ . "/temp.env");
        }
    }

    public function backupCreds(): void
    {
        if (file_exists($this->envDir . "creds.json")) {
            copy($this->envDir . "creds.json", __DIR__ . "/temp.creds.json");
        }
    }

    public function cleanupCreds(): void
    {
        if (file_exists(__DIR__ . "/temp.creds.json")) {
            copy(__DIR__ . "/temp.creds.json", $this->envDir . "creds.json");
            unlink(__DIR__ . "/temp.creds.json");
        }
    }
}

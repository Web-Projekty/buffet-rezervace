<?php

declare (strict_types = 1);

namespace Buffet\Utils;

class EnvSetup
{
    public string $envDir = __DIR__ . "/../Database/";
    public string $envPath;

    public string $envContent = "DECRYPT_KEY=a_key";
    public bool $returnOriginalEnv = false;
    public bool $isDummy = false;

    public function __construct()
    {
        $this->envPath = $this->envDir . ".env";
    }

    /**
     * Set up a mock .env environment for testing
     * @param $fileContent
     */
    public function setupDummyEnv($fileContent = ""): void
    {
        // takes default content if custom content is not provided
        if (empty($fileContent)) {
            $fileContent = $this->envContent;
        }

        if (file_exists($this->envPath) && $this->returnOriginalEnv == false) {
            $this->returnOriginalEnv = true;
            copy($this->envPath, __DIR__ . "/temp.env");
        }
        if ($env = fopen($this->envPath, "w")) {
            fwrite($env, $fileContent);
            fclose($env);
            $this->isDummy = true;
        }
    }

    public function cleanupDummyEnv(): void
    {
        if ($this->isDummy) {
            unlink($this->envPath);
            $this->isDummy = false;
        }
        if ($this->returnOriginalEnv) {
            copy(__DIR__ . "/temp.env", $this->envPath);
            unlink(__DIR__ . "/temp.env");
            $this->returnOriginalEnv = false;
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

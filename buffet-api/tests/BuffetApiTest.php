<?php

declare (strict_types = 1);

use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

require __DIR__ . '/../vendor/autoload.php';

class BuffetApiTest extends TestCase
{

    protected string $envPath = __DIR__ . "/../src/Database/.env";
    protected string $envDir = __DIR__ . "/../src/Database/";
    protected string $envContent = "DECRYPT_KEY=a_key";

    protected bool $returnOriginalEnv = false;

    protected function setUp(): void
    {
        // Set up a mock .env environment for testing
        if (file_exists($this->envPath)) {
            $this->returnOriginalEnv = true;
            copy($this->envPath, __DIR__ . "/temp.env");
        } else {
            if ($env = fopen($this->envPath, "w")) {
                fwrite($env, $this->envContent);
                fclose($env);
            }
        }
    }

    #[TestDox('Setup works')]
    public function testRunTest()
    {
        $this->assertFileExists($this->envPath);
    }

    protected function tearDown(): void
    {
        unlink($this->envPath);
        if ($this->returnOriginalEnv) {
            copy(__DIR__ . "/temp.env", $this->envPath);
            unlink(__DIR__ . "/temp.env");
        }
    }
}

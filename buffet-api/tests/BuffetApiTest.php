<?php

declare (strict_types = 1);

use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

require __DIR__ . '/../vendor/autoload.php';

class BuffetApiTest extends TestCase
{

    protected string $envPath = __DIR__ . "/../src/Database/.env";

    protected bool $returnOriginalEnv = false;

    protected function setUp(): void
    {
        // Set up a mock .env environment for testing
        if (file_exists($this->envPath)) {
            $this->returnOriginalEnv = true;
            copy($this->envPath, __DIR__ . "/temp.env");
        } else {
            $env = fopen(__DIR__ . $this->envPath, "w");
            fwrite($env, "DECRYPT_KEY=12345678901234567890123456789012");
        }

    }

    #[TestDox('Setup works')]
    public function testRunTest()
    {
        $this->assertFileExists(__DIR__ . $this->envPath);
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

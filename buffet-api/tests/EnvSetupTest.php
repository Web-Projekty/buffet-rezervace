<?php

declare (strict_types = 1);

namespace Buffet\Tests;

use Buffet\Utils\EnvSetup;
use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

require __DIR__ . '/../vendor/autoload.php';

class EnvSetupTest extends TestCase
{
    protected EnvSetup $envSetup;

    protected bool $returnOriginalEnv = false;

    protected function setUp(): void
    {
        $this->envSetup = new EnvSetup();
    }

    #[TestDox('Env file creation')]
    public function testEnvSetup()
    {
        $this->assertFileDoesNotExist($this->envSetup->envPath);

        $this->envSetup->setupDummyEnv();
        $this->assertFileExists($this->envSetup->envPath);
        $this->assertFileIsReadable($this->envSetup->envPath);
        $this->assertFileIsWritable($this->envSetup->envPath);
        $this->assertStringEqualsFile(expectedFile: $this->envSetup->envPath, actualString: $this->envSetup->envContent, message: "Created env file content does not match the default value");

        $this->envSetup->cleanupDummyEnv();
        $this->assertFileDoesNotExist($this->envSetup->envPath);
    }

    #[TestDox('Env file custom content')]
    public function testEnvFileContent()
    {
        $customEnvContent = 'FOO=BAR';
        $this->envSetup->setupDummyEnv($customEnvContent);

        $this->assertFileExists($this->envSetup->envPath);
        $this->assertFileIsReadable($this->envSetup->envPath);
        $this->assertStringEqualsFile(expectedFile: $this->envSetup->envPath, actualString: $customEnvContent, message: "Created env file content does not match the custom value");
    }

    protected function tearDown(): void
    {
        $this->envSetup->cleanupDummyEnv();
    }
}

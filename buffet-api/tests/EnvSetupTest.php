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
        $this->assertFalse($this->envSetup->returnOriginalEnv);

        // checks for original env file
        if (file_exists($this->envSetup->envPath)) {
            $hadOrginalEnv = true;
        }

        $this->envSetup->setupDummyEnv();

        if ($hadOrginalEnv) {
            $this->assertTrue($this->envSetup->returnOriginalEnv);
        }

        $this->assertFileExists($this->envSetup->envPath);
        $this->assertFileIsReadable($this->envSetup->envPath);
        $this->assertFileIsWritable($this->envSetup->envPath);
        $this->assertStringEqualsFile(expectedFile: $this->envSetup->envPath, actualString: $this->envSetup->envContent, message: "Created env file content does not match the default value");
    }

    #[TestDox('Env file custom content')]
    public function testEnvFileContent()
    {
        $customEnvContent = 'CUSTOM=CONTENT';
        $this->envSetup->setupDummyEnv($customEnvContent);

        $this->assertFileExists($this->envSetup->envPath);
        $this->assertFileIsReadable($this->envSetup->envPath);
        $this->assertStringEqualsFile(expectedFile: $this->envSetup->envPath, actualString: $customEnvContent, message: "Created env file content does not match the custom value");
    }

    #[TestDox('Env file backup')]
    public function testEnvFileBackup()
    {
        $customEnvContent = 'CUSTOM=CONTENT';

        // checks for original env file
        if (file_exists($this->envSetup->envPath)) {
            $hadOrginalEnv = true;
        }

        $this->assertFalse($this->envSetup->returnOriginalEnv);

        $this->envSetup->setupDummyEnv($customEnvContent);

        if ($hadOrginalEnv) {
            $this->assertTrue($this->envSetup->returnOriginalEnv);
        }
        $this->assertStringEqualsFile(expectedFile: $this->envSetup->envPath, actualString: $customEnvContent, message: "Created env file content does not match the custom value");
    }

    protected function tearDown(): void
    {
        $this->envSetup->cleanupDummyEnv();
    }
}

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

    #[TestDox('Env file keep original')]
    public function testEnvFileKeepOriginal()
    {
        // manually backup original env file
        if (file_exists($this->envSetup->envPath)) {
            copy($this->envSetup->envPath, __DIR__ . "/temp.env");
        }

        $customEnvContent = 'CUSTOM=CONTENT';
        // setup a mock env
        $this->envSetup->setupDummyEnv($customEnvContent);
        $this->assertFileExists($this->envSetup->envPath);
        $this->assertStringEqualsFile(expectedFile: $this->envSetup->envPath, actualString: $customEnvContent);

        // resets envSetup object
        $this->envSetup = new EnvSetup();

        $this->envSetup->setupDummyEnv();
        $this->assertStringEqualsFile(expectedFile: $this->envSetup->envPath, actualString: $this->envSetup->envContent);

        $this->envSetup->cleanupDummyEnv();
        $this->assertStringEqualsFile(expectedFile: $this->envSetup->envPath, actualString: $customEnvContent);


        ### Custom teardown sequence ###

        // manually delete original env file and return original
        unlink($this->envSetup->envPath);
        if (file_exists(__DIR__ . "/temp.env")) {
            copy(__DIR__ . "/temp.env", $this->envSetup->envPath);
            unlink(__DIR__ . "/temp.env");
        }

        // reset object again
        $this->envSetup = new EnvSetup();

        // delete automatically created env file backup
        if (file_exists($this->envSetup->envBackupPath)) {
            unlink($this->envSetup->envBackupPath);
        }
    }

    /*#[TestDox('Env file setup-cleanup sequence')]
    public function testEnvFileSetupCleanupSequence()
    {

    }*/

    protected function tearDown(): void
    {
        $this->envSetup->cleanupDummyEnv();
    }
}

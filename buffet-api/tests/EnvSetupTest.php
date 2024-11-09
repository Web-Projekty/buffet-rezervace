<?php

declare (strict_types = 1);

namespace Buffet\Tests;

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

        $this->envSetup->cleanupDummyEnv();
        $this->assertFileDoesNotExist($this->envSetup->envPath);
    }

    /*#[TestDox('Env file custom content')]
    public function testEnvFileContent()
    {

    }*/

    protected function tearDown(): void
    {
        $this->envSetup->cleanupDummyEnv();
    }
}

<?php

declare (strict_types = 1);

namespace Buffet\Tests;

use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

require __DIR__ . '/../vendor/autoload.php';

class BuffetApiTest extends TestCase
{
    protected EnvSetup $envSetup;

    protected bool $returnOriginalEnv = false;

    protected function setUp(): void
    {
        $this->envSetup = new EnvSetup();
        $this->envSetup->setupDummyEnv();
    }

    #[TestDox('Setup works')]
    public function testRunTest()
    {
        $this->assertFileExists($this->envSetup->envPath);
    }

    protected function tearDown(): void
    {
        $this->envSetup->cleanupDummyEnv();
    }
}

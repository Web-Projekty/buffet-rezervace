<?php

use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

require __DIR__ . '/../vendor/autoload.php';

class BuffetApiTest extends TestCase
{
    protected function setUp(): void
    {
        // Set up a mock .env environment for testing
        touch(__DIR__ . "/../src/Database/.env");
    }

    #[TestDox('Setup works')]
    public function testRunTest()
    {
        $this->assertFileExists(__DIR__ . "/../src/Database/.env");
    }

}

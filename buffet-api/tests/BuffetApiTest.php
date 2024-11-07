<?php

use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

require __DIR__ . '/../vendor/autoload.php';

class BuffetApiTest extends TestCase
{
    protected function setUp(): void
    {
        // Set up a mock .env environment for testing
    }

    #[TestDox('Test runs')]
    public function testRunTest()
    {
        $this->assertTrue(true);
    }

}

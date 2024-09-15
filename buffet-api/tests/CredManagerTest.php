<?php

use PHPUnit\Framework\TestCase;
use Dotenv\Dotenv;

final class CredManagerTest extends TestCase
{
    #[TestDox('It does something')]
    public function testEnvClass(): void
    {
        $this->assertTrue(!class_exists("Dotenv"));
    }
}
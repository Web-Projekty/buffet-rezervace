<?php

declare (strict_types = 1);

namespace Buffet\Tests;

use Buffet\Types\Error;
use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

require __DIR__ . '/../../../vendor/autoload.php';

class ErrorTest extends TestCase
{
/**
 * @var array<mixed>
 */
    private array $errorList;
    protected function setUp(): void
    {
        $this->errorList = Error::cases();
    }

    #[TestDox('All Error cases have values')]
    public function testErrorHasValue(): void
    {

        foreach ($this->errorList as $error) {
            $this->assertIsString($error->value);
            $this->assertNotNull($error->value);
            $this->assertNotNull($error);
        }
    }
}

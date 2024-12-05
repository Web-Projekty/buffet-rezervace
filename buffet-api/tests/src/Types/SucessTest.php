<?php

declare (strict_types = 1);

namespace Buffet\Tests\Types;

use Buffet\Types\Success;
use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

require __DIR__ . '/../../../vendor/autoload.php';

class SucessTest extends TestCase
{
/**
 * @var array<mixed>
 */
    private array $sucessList;
    protected function setUp(): void
    {
        $this->sucessList = Success::cases();
    }

    #[TestDox('All Error cases have values')]
    public function testErrorHasValue(): void
    {
        foreach ($this->sucessList as $sucess) {
            $this->assertIsString($sucess->value);
            $this->assertNotNull($sucess->value);
            $this->assertNotNull($sucess);
        }
    }

    #[TestDox("TestGetValueMethod")]
    public function testGetValue(): void
    {
        foreach ($this->sucessList as $sucess) {
            $this->assertIsString($sucess->getValue());
            $this->assertNotNull($sucess->getValue());
            $this->assertSame($sucess->value, $sucess->getValue());
        }
    }

    // add isProd implementation
    /*  #[TestDox("TestIsProdValue")]
public function testIsProd(): void
{
foreach ($this->errorList as $error) {

}
}*/
}

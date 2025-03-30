<?php

declare (strict_types = 1);

namespace Buffet\Tests\Utils;

use Buffet\Types\Error;
use Buffet\Types\Settings;
use Buffet\Utils\EnvWriter;
use Buffet\Utils\Helper;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\TestDox;
use PHPUnit\Framework\TestCase;

class HelperTest extends TestCase
{
    protected function setUp(): void
    {
        EnvWriter::write(Settings::IsProd, "false");
    }

    /**
     * @return array<array<Error>>
     */
    public static function errorResponseProvider(): array
    {
        return [
            [Error::AlreadySubscribed],
            [Error::BadDomain],
            [Error::Corrupted],
            [Error::CorruptedOrNull],
            [Error::InvalidJson]
        ];
    }

    #[DataProvider("errorResponseProvider")]
    #[TestDox("Test getErrorResponse")]
    /**
     * @param string $returned
     * @param string $expected
     */
    public function testGetErrorResponse(Error $error): void
    {
        $expected = "{\"status\":\"failed\",\"payload\":{\"msg\":\"" . $error->value . "\"}}";
        $actual = Helper::getErrorResponse($error);

        $this->assertSame($expected, $actual);
    }

}

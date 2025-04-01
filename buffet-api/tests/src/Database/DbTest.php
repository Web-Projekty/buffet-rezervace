<?php

declare (strict_types = 1);

use Buffet\Database\DatabaseManager;
use Buffet\Database\Models\UserModel;
use Buffet\Types\ApiResponse;
use PHPUnit\Framework\TestCase;

class DbTest extends TestCase
{
    protected function setUp(): void
    {
        if (!isset($GLOBALS["is_db_setupped"])) {
            $dbMan = new DatabaseManager(new ApiResponse());
            $GLOBALS["is_testing"] = true;
            $dbMan->setupConnection();
            $GLOBALS["is_db_setupped"] = true;
        }
    }

    public function testDbSetup(): void
    {
        $this->assertSame(UserModel::query()->first()->toArray()["email"], "admin@buffet.vlastas.cc");
    }
}

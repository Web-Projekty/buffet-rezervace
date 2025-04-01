<?php
declare (strict_types = 1);

use Buffet\Api\ItemApi;
use Buffet\Database\DatabaseManager;
use Buffet\Database\Models\ItemModel;
use Buffet\Database\Models\VariantModel;
use Buffet\Types\ApiResponse;
use Buffet\Types\Settings;
use Buffet\Utils\EnvWriter;
use Exception;
use PHPUnit\Framework\TestCase;

final class ItemApiTest extends TestCase
{
    protected function setUp(): void
    {
        EnvWriter::write(Settings::IsProd, "false");
        if (!isset($GLOBALS["is_db_setupped"])) {
            $dbMan = new DatabaseManager(new ApiResponse());
            $GLOBALS["is_testing"] = true;
            $dbMan->setupConnection();
            $GLOBALS["is_db_setupped"] = true;
        }
    }

    public function testCountItemPriceWithoutVariants(): void
    {
        // Insert an item record with id=1 and price=100
        ItemModel::query()->create(['id' => 1, "name" => "name", 'price' => 100, "description" => "description", "image" => "image", "allergens" => "[1,13]", "category" => 1]);
        $items = [
            ['id' => 1, 'quantity' => 2, 'variants' => []]
        ];
        $total = ItemApi::countItemPrice($items);
        $this->assertEquals(200, $total);
    }

    public function testCountItemPriceWithOneVariant(): void
    {
        // Insert an item record with id=1 and price=100
        ItemModel::query()->create(['id' => 1, "name" => "name", 'price' => 100, "description" => "description", "image" => "image", "allergens" => "[1,13]", "category" => 1]);
        // Insert a variant record for item id=1
        VariantModel::query()->create([
            'id' => 54,
            'itemId' => 1,
            'name' => 'v1',
            'addedPrice' => 20,
            'isExclusive' => false
        ]);
        $items = [
            ['id' => 1, 'quantity' => 2, 'variants' => [54]]
        ];
        $total = ItemApi::countItemPrice($items);
        $this->assertEquals(240, $total);
    }

    public function testCountItemPriceWithMultipleItemsAndVariants(): void
    {
        // Insert two items
        ItemModel::query()->create(['id' => 1, "name" => "name", 'price' => 100, "description" => "description", "image" => "image", "allergens" => "[1,13]", "category" => 1]);
        ItemModel::query()->create(['id' => 4, "name" => "name", 'price' => 150, "description" => "description", "image" => "image", "allergens" => "[1,13]", "category" => 1]);
        // Insert variants for each item
        VariantModel::query()->create([
            'id' => 55,
            'itemId' => 1,
            'name' => 'v1',
            'addedPrice' => 20,
            'isExclusive' => false
        ]);
        VariantModel::query()->create([
            'id' => 56,
            'itemId' => 4,
            'name' => 'v2',
            'addedPrice' => 30,
            'isExclusive' => false
        ]);
        $items = [
            ['id' => 1, 'quantity' => 2, 'variants' => [55]],
            ['id' => 4, 'quantity' => 1, 'variants' => [56]]
        ];
        $total = ItemApi::countItemPrice($items);
        $expected = (100 * 2) + (150 * 1) + (20 * 2) + (30 * 1);
        $this->assertEquals($expected, $total);
    }

    public function testCountItemPriceWithInvalidVariant(): void
    {
        // Insert an item with id=1 and price=100
        ItemModel::query()->create(['id' => 1, "name" => "name", 'price' => 100, "description" => "description", "image" => "image", "allergens" => "[1,13]", "category" => 1]);
        // Insert a variant with itemId that doesn't match the item in the order
        VariantModel::query()->create([
            'id' => 57,
            'itemId' => 2, // invalid: should be 1
            'name' => 'v1',
            'addedPrice' => 20,
            'isExclusive' => false
        ]);
        $items = [
            ['id' => 1, 'quantity' => 2, 'variants' => [57]]
        ];
        $this->expectException(Exception::class);
        $this->expectExceptionCode(2);
        ItemApi::countItemPrice($items);
    }

    public function testCountItemPriceWithDuplicateExclusiveVariant(): void
    {
        // Insert an item with id=1 and price=100
        ItemModel::query()->create(['id' => 1, "name" => "name", 'price' => 100, "description" => "description", "image" => "image", "allergens" => "[1,13]", "category" => 1]);
        // Insert two exclusive variants for the same item
        VariantModel::query()->create([
            'id' => 58,
            'itemId' => 1,
            'name' => 'v1',
            'addedPrice' => 20,
            'isExclusive' => true
        ]);
        VariantModel::query()->create([
            'id' => 59,
            'itemId' => 1,
            'name' => 'v2',
            'addedPrice' => 30,
            'isExclusive' => true
        ]);
        $items = [
            ['id' => 1, 'quantity' => 2, 'variants' => [58, 59]]
        ];
        $this->expectException(Exception::class);
        $this->expectExceptionCode(3);
        ItemApi::countItemPrice($items);
    }
}


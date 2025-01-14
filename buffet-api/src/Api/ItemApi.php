<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Database\Models\ItemModel;

class ItemApi
{
    /**
     * @param array<array{id:int,count:int,variants:array<int>}> $items
     */
    public static function countItemPrice(array $items): int
    {
        $itemIds = [];
        foreach ($items as $item) {
            $itemIds[] = $item["id"];
        }
        $itemIds = array_unique($itemIds);

        $items = ItemModel::getByIdArray($itemIds);

        /**
         * @var int $total
         */
        $total = 0;
        /**
         * @var ItemModel $item
         */
        foreach ($items as $item) {
            $total += $item->getAttribute("price");
        }
        return $total;
    }
}

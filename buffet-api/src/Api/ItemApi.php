<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Database\Models\ItemModel;
use Illuminate\Support\Collection;

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

        $itemQuery = ItemModel::getByIdArray($itemIds);

        /**
         * @var int $total
         */
        $total = 0;
        /**
         * @var ItemModel $item
         */
        foreach ($itemQuery as $item) {
            $itemId = $item->getAttribute("id");
            $count = Collection::make($items)->where("id", "=", $itemId)->first()["count"];
            $total += $item->getAttribute("price") * $count;
        }
        return $total;
    }
}

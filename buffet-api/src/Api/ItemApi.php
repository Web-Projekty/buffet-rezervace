<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Database\Models\ItemModel;

class ItemApi
{
    /**
     * @param array<int|int> $itemIds
     */
    public static function countItemPrice(array $itemIds): int
    {

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

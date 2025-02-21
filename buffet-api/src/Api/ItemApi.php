<?php

declare (strict_types = 1);

namespace Buffet\Api;

use Buffet\Database\Models\ItemModel;
use Buffet\Database\Models\VariantModel;
use Exception;
use Illuminate\Support\Collection;

class ItemApi
{
    /**
     * @param array<array{id:int,quantity:int,variants:array<int>}> $items
     */
    public static function countItemPrice(array $items): int
    {
        /**
         * @var array<int> $itemIds
         */
        $itemIds = [];
        foreach ($items as $item) {
            $itemIds[] = $item["id"];
        }
        $itemIds = array_unique($itemIds);

        /**
         * @var array<int> $variantIds
         */
        $variantIds = [];
        foreach ($items as $item) {
            foreach ($item["variants"] as $variant) {
                $variantIds[] = $variant;
            }
        }
        $variantIds = array_unique($variantIds);

        $itemQuery = ItemModel::getByIdArray($itemIds);

        $variantPrice = 0;
        if (!empty($variantIds)) {
            $variantQuery = VariantModel::getByIdArray($variantIds);
            //   var_dump($variantQuery->toArray());

            foreach ($items as $item) {
                $exclusiveSelected = false;
                foreach ($item["variants"] as $variantId) {

                    /**
                     * @var array{id:int,itemId:int,name:string,addedPrice:int,isExclusive:bool} $dbVariant
                     */
                    $dbVariant = $variantQuery->where("id", "=", $variantId)->first()->toArray();
                    $variantPrice += $dbVariant["addedPrice"] * $item["quantity"];
                    if ($dbVariant["itemId"] != $item["id"]) {
                        throw new Exception("Invalid variants", 2);
                    }
                    if ($dbVariant["isExclusive"]) {
                        if ($exclusiveSelected) {
                            throw new Exception("Duplicate exclusive variant selected", 3);
                        } else {
                            $exclusiveSelected = true;
                        }
                    }
                }
            }
        }
        /**
         * @var int $total
         */
        $total = 0;
        /**
         * @var ItemModel $item
         */
        foreach ($itemQuery as $item) {
            $itemId = $item->getAttribute("id");
            $count = Collection::make($items)->where("id", "=", $itemId)->first()["quantity"];
            $total += $item->getAttribute("price") * $count;
        }

        $total += $variantPrice;
        return $total;
    }
}

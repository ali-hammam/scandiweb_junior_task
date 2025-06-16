<?php

namespace Config\GraphQL\Types;
require_once __DIR__ . '/CategoryType.php';
require_once __DIR__ . '/ProductType.php';
require_once __DIR__ . '/ProductPriceType.php';

use Config\GraphQL\Types\CategoryType;
use Config\GraphQL\Types\ProductPriceType;
use Config\GraphQL\Types\ProductType;

class TypeRegistry
{
    private static $types = [];

    public static function product(): ProductType
    {
        if (!isset(self::$types['product'])) {
            self::$types['product'] = new ProductType();
        }

        return self::$types['product'];
    }

    public static function category(): CategoryType
    {
        if (!isset(self::$types['category'])) {
            self::$types['category'] = new CategoryType();
        }

        return self::$types['category'];
    }

    public static function productPrice(): ProductPriceType
    {
        if (!isset(self::$types['product_price'])) {
            self::$types['product_price'] = new ProductPriceType();
        }

        return self::$types['product_price'];
    }
}

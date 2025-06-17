<?php

namespace Config\GraphQL\Types;
require_once __DIR__ . '/CategoryType.php';
require_once __DIR__ . '/ProductType.php';
require_once __DIR__ . '/ProductPriceType.php';
require_once __DIR__ . '/OrderType.php';
require_once __DIR__ . '/AttributeKeyValueType.php';
require_once __DIR__ . '/OrderInputType.php';

use Config\GraphQL\Types\CategoryType;
use Config\GraphQL\Types\ProductPriceType;
use Config\GraphQL\Types\ProductType;
use Config\GraphQL\Types\OrderType;
use Config\GraphQL\Types\AttributeKeyValueType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

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

    public static function order(): OrderType
    {
        if (!isset(self::$types['Order'])) {
            self::$types['Order'] = new OrderType();
        }

        return self::$types['Order'];
    }

    public static function orderInput(): OrderInputType {
        if (!isset(self::$types['order_input'])) {
            self::$types['order_input'] = new OrderInputType();
        }
        return self::$types['order_input'];
    }

    public static function attributeKeyValue(): AttributeKeyValueType
    {
        if (!isset(self::$types['attribute_key_value'])) {
            self::$types['attribute_key_value'] = new AttributeKeyValueType();
        }

        return self::$types['attribute_key_value'];
    }

    public static function attributeKeyValueInput(): \GraphQL\Type\Definition\InputObjectType
    {
        if (!isset(self::$types['attribute_key_value_input'])) {
            self::$types['attribute_key_value_input'] = new \GraphQL\Type\Definition\InputObjectType([
                'name' => 'AttributeKeyValueInput',
                'fields' => [
                    'key' => Type::nonNull(Type::string()),
                    'value' => Type::nonNull(Type::string()),
                ],
            ]);
        }

        return self::$types['attribute_key_value_input'];
    }
}

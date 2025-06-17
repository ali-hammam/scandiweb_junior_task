<?php
namespace Config\GraphQL\Types;
require_once __DIR__ . '/AttributeSetType.php';
require_once __DIR__ . '/ProductPriceType.php';
require_once __DIR__ . '/../../../app/controllers/ProductController.php';

use Config\GraphQL\Types\AttributeSetType;
use Config\GraphQL\Types\ProductPriceType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends ObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'in_stock' => Type::boolean(),
                'category_id' => Type::string(),
                'brand' => Type::string(),
                'gallery' => Type::listOf(Type::string()),
                'attributes' => [
                    'type' => Type::listOf(new AttributeSetType()),
                    'resolve' => function ($product) {
                        $controller = new \App\Controllers\ProductController();
                        return $controller->formatProduct($product);
                    }
                ],
                'product_price' => [
                    'type' => TypeRegistry::productPrice(),
                    'resolve' => function ($product) {
                        return $product->productPrice;
                    }
                ],
                'description' => Type::string(),
                '__typename' => Type::string(),
            ],
        ]);
    }
}

<?php

namespace Config\GraphQL\Resolvers;
require_once __DIR__ . '/../GraphQLResolver.php';
require_once __DIR__ . '/../types/TypeRegistry.php';

use App\Controllers\ProductController;
use Config\GraphQL\GraphQLResolver;
use Config\GraphQL\Types\TypeRegistry;
use GraphQL\Type\Definition\Type;

class ProductById implements GraphQLResolver
{
    public static function args(): array
    {
        return [
            'product_id' => ['type' => Type::string()],
        ];
    }

    public static function type(): Type
    {
        return TypeRegistry::product();
    }

    public static function resolve(): callable
    {
        return function ($rootValue, array $args) {
            $productController = new ProductController();

            if (isset($args['product_id'])) {
                return $productController->getProduct($args['product_id']);
            }

            return [
                'message' => 'Product not found',
            ];
        };
    }
}

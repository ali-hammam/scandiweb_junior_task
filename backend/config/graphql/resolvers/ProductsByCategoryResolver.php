<?php

namespace Config\GraphQL\Resolvers;
require_once __DIR__ . '/../GraphQLResolver.php';
require_once __DIR__ . '/../types/TypeRegistry.php';

use App\Controllers\ProductController;
use Config\GraphQL\GraphQLResolver;
use Config\GraphQL\Types\TypeRegistry;
use GraphQL\Type\Definition\Type;

class ProductsByCategoryResolver implements GraphQLResolver
{
    public static function args(): array
    {
        return [
            'category_id' => ['type' => Type::string()],
        ];
    }

    public static function type(): Type
    {
        return Type::listOf(TypeRegistry::product());
    }

    public static function resolve(): callable
    {
        return function ($rootValue, array $args) {
            $productController = new ProductController();

            if (isset($args['category_id'])) {
                return $productController->getProductByCategory($args['category_id']);
            }

            // Example: fetch from DB (mocked here)
            // In real case, you'd call DB::table('products')->where('id', $productId)->first() or Eloquent
            return [
                'message' => 'Product not found',
            ];
        };
    }
}

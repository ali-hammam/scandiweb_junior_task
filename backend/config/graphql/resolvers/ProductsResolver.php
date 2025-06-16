<?php
namespace Config\GraphQL\Resolvers;
require_once __DIR__ . '/../GraphQLResolver.php';
require_once __DIR__ . '/../types/TypeRegistry.php';

use App\Controllers\ProductController;
use Config\GraphQL\GraphQLResolver;
use Config\GraphQL\Types\TypeRegistry;
use GraphQL\Type\Definition\Type;

class ProductsResolver implements GraphQLResolver {
    public static function args(): array {
        return [];
    }

    public static function type(): Type {
        return Type::listOf(TypeRegistry::product());
    }

    public static function resolve(): callable {
        return function ($rootValue, array $args) {
            $productController = new ProductController();
            return $productController->getProducts();
        };
    }
}

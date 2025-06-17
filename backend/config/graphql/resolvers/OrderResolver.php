<?php
namespace Config\GraphQL\Resolvers;
require_once __DIR__ . '/../GraphQLResolver.php';
require_once __DIR__ . '/../types/TypeRegistry.php';

use App\Controllers\OrderController;
use Config\GraphQL\GraphQLResolver;
use Config\GraphQL\Types\TypeRegistry;
use GraphQL\Type\Definition\Type;

class OrderResolver implements GraphQLResolver {
    public static function args(): array {
        return [
            'orders' => ['type' => Type::nonNull(Type::listOf(TypeRegistry::orderInput()))]
        ];
    }

    public static function type(): Type {
        return Type::listOf(TypeRegistry::Order());
    }

    public static function resolve(): callable {
        return function ($rootValue, array $args) {
            $orderController = new OrderController();
            return $orderController->addOrder($args);
        };
    }
}

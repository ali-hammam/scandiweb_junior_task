<?php
namespace Config\GraphQL\Types;
require_once __DIR__ . '/TypeRegistry.php';

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use Config\GraphQL\Types\TypeRegistry;

class OrderType extends ObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'Order',
            'fields' => [
                'id' => Type::int(),
                'product_id' => Type::string(),
                'unit_price' => Type::float(),
                'quantity' => Type::int(),
                'attributes' => Type::listOf(TypeRegistry::attributeKeyValue()),
                '__typename' => Type::string(),
            ],
        ]);
    }
}

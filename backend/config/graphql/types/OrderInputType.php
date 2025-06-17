<?php
namespace Config\GraphQL\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderInputType extends InputObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'OrderInput',
            'fields' => [
                'product_id' => Type::nonNull(Type::string()),
                'unit_price' => Type::nonNull(Type::float()),
                'quantity' => Type::nonNull(Type::int()),
                'attributes' => Type::listOf(TypeRegistry::attributeKeyValueInput())
            ]
        ]);
    }
}

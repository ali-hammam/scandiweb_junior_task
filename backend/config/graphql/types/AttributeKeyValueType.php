<?php
namespace Config\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeKeyValueType extends ObjectType  {
    public function __construct() {
        parent::__construct([
            'name' => 'AttributeKeyValue',
            'fields' => [
                'key' => Type::string(),
                'value' => Type::string(),
            ],
        ]);
    }
}

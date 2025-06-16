<?php
namespace Config\GraphQL\Types;
require_once __DIR__ . '/AttributeType.php';

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use Config\GraphQL\Types\AttributeType;

class AttributeSetType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeSet',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'type' => Type::string(),
                'items' => Type::listOf(new AttributeType()),
                '__typename' => Type::string(),
            ],
        ]);
    }
}

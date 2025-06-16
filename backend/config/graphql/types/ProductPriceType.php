<?php
namespace Config\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductPriceType extends ObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'product_price',
            'fields' => [
                'product_id' => Type::string(),
                'currency_label' => Type::string(),
                'amount' => Type::float(),
                '__typename' => Type::string(),
            ],
        ]);
    }
}

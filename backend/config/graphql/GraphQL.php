<?php

namespace Config\GraphQL;

require_once __DIR__ . '/resolvers/ProductsResolver.php';
require_once __DIR__ . '/resolvers/ProductsByCategoryResolver.php';
require_once __DIR__ . '/resolvers/ProductById.php';
require_once __DIR__ . '/resolvers/CategoriesResolver.php';

use Config\GraphQL\Resolvers\CategoriesResolver;
use Config\GraphQL\Resolvers\ProductsByCategoryResolver;
use Config\GraphQL\Resolvers\ProductById;
use Config\GraphQL\Resolvers\ProductsResolver;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;

class GraphQL {
    static public function handle() {
        $resolvers = [
            'products' => ProductsResolver::class,
            'product' => ProductById::class,
            'productsByCategory' => ProductsByCategoryResolver::class,
            'categories' => CategoriesResolver::class,
        ];
        $fields = [];

        foreach ($resolvers as $name => $resolver) {
            $fields[$name] = [
                'type' => $resolver::type(),
                'args' => $resolver::args(),
                'resolve' => $resolver::resolve(),
            ];
        }

        try {
            $queryType = new ObjectType([
                'name' => 'Query',
                'fields' => $fields,
            ]);

            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'sum' => [
                        'type' => Type::int(),
                        'args' => [
                            'x' => ['type' => Type::int()],
                            'y' => ['type' => Type::int()],
                        ],
                        'resolve' => static function ($calc, array $args) {
                            return $args['x'] + $args['y'];
                        },
                    ],
                ],
            ]);

            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType)
            );

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to read request body (php://input)');
            }

            $input = json_decode($rawInput, true);

            if (!is_array($input) || !isset($input['query']) || !is_string($input['query'])) {
                throw new RuntimeException("Missing or invalid GraphQL 'query' in request.");
            }

            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            $rootValue = ['prefix' => 'You said: '];
            $result = GraphQLBase::executeQuery($schema, $query, $rootValue, null, $variableValues);
            $output = $result->toArray(true);
        } catch (\Exception $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        header("Access-Control-Allow-Origin: http://localhost:5173");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        echo json_encode($output);
    }

}
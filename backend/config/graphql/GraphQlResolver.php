<?php
namespace Config\GraphQL;

interface GraphQLResolver {
    public static function args(): array;
    public static function type(): \GraphQL\Type\Definition\Type;
    public static function resolve(): callable;
}

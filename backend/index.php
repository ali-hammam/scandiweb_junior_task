<?php

require_once __DIR__ . './vendor/autoload.php';
require_once __DIR__ . './bootstrap.php';
require_once __DIR__ . './config/graphql/GraphQL.php';

use Config\GraphQL\GraphQL;

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/graphql') {
    GraphQL::handle();
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Not found']);

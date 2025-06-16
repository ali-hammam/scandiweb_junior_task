<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';
require_once __DIR__ . '/../config/graphql/GraphQL.php'; // CASE SENSITIVE

use Config\GraphQL\GraphQL;

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/graphql') {
    GraphQL::handle(); // Don't echo; it already outputs
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Not found']);

<?php
require_once __DIR__ . '/../bootstrap.php';
foreach (glob(__DIR__ . '/*.php') as $file) {
    if (basename($file) !== basename(__FILE__)) {
        require_once $file;
    }
}

use Migrations\CreateAttributesItemsTable;
use Migrations\CreateAttributesTable;
use Migrations\CreateCategoriesTable;
use Migrations\CreateCurrenciesTable;
use Migrations\CreateProductAttributesTable;
use Migrations\CreateProductGalleriesTable;
use Migrations\CreateProductPricesTable;
use Migrations\createProductsTable;

$migrations = [
    new CreateCategoriesTable(),
    new CreateProductsTable(),
    new CreateAttributesTable(),
    new CreateAttributesItemsTable(),
    new CreateCurrenciesTable(),
    new createProductAttributesTable(),
    new CreateProductGalleriesTable(),
    new CreateProductPricesTable()
];

foreach ($migrations as $migration) {
    $migration->up();
    echo get_class($migration) . " migrated successfully.\n";
}
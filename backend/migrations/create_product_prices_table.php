<?php
namespace Migrations;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

class CreateProductPricesTable
{
    public function up() {
        if (!Capsule::schema()->hasTable('product_prices')) {
            Capsule::schema()->create('product_prices', function (Blueprint $table) {
                $table->id();
                $table->string('product_id');
                $table->string('currency_label');
                $table->decimal('amount', 10, 2);
                $table->string('__typename')->default('Price');

                $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
                $table->foreign('currency_label')->references('label')->on('currencies');
            });
        }
    }

}
<?php
namespace Migrations;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

class CreateProductAttributesTable {
    public function up()
    {
        if (!Capsule::schema()->hasTable('product_attributes')) {
            Capsule::schema()->create('product_attributes', function (Blueprint $table) {
                $table->id();
                $table->string('product_id');
                $table->unsignedBigInteger('attribute_id');
                $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
                $table->foreign('attribute_id')->references('id')->on('attributes')->onDelete('cascade');
            });
        }
    }
}
<?php
namespace Migrations;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

class CreateProductGalleriesTable {
    public function up()
    {
        if (!Capsule::schema()->hasTable('product_galleries')) {
            Capsule::schema()->create('product_galleries', function (Blueprint $table) {
                $table->id();
                $table->string('product_id');
                $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
                $table->text('image_url');
                $table->string('__typename')->default('Currency');
            });
        }
    }
}
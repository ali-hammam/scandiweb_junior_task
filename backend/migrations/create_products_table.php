<?php
namespace Migrations;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

class createProductsTable
{
    public function up()
    {
        if (!Capsule::schema()->hasTable('products')) {
            Capsule::schema()->create('products', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('name');
                $table->boolean('in_stock');
                $table->string('brand');
                $table->text('description')->nullable();
                $table->string('category_id');  // foreign key as string
                $table->json('attributes')->nullable();
                $table->json('gallery')->nullable();
                $table->string('__typename')->default('Product');

                // Optional: Foreign key constraint
                $table->foreign('category_id')->references('name')->on('categories')->onDelete('cascade');
            });
        }
    }
}

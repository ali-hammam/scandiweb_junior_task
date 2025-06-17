<?php
namespace Migrations;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

class CreateOrdersTable
{
    public function up()
    {
        if (!Capsule::schema()->hasTable('orders')) {
            Capsule::schema()->create('orders', function (Blueprint $table) {
                $table->id();
                $table->string('product_id');
                $table->decimal('unit_price', 10, 2);
                $table->integer('quantity');
                $table->json('attributes');
                $table->string('__typename')->default('Order');

                $table->timestamps();
                $table->foreign('product_id')->references('id')->on('products');
            });
        }
    }
}
<?php
namespace Migrations;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

class CreateAttributesItemsTable {
    public function up()
    {
        if (!Capsule::schema()->hasTable('attribute_items')) {
            Capsule::schema()->create('attribute_items', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('attribute_id');
                $table->string('display_value');
                $table->string('value');
                $table->string('__typename')->default('Attribute');
                $table->foreign('attribute_id')->references('id')->on('attributes')->onDelete('cascade');
            });
        }
    }
}

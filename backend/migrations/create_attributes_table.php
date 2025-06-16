<?php
namespace Migrations;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

class CreateAttributesTable
{
    public function up()
    {
        if (!Capsule::schema()->hasTable('attributes')) {
            Capsule::schema()->create('attributes', function (Blueprint $table) {
                $table->id();
                $table->string('name'); // e.g., Size, Color
                $table->string('type'); // 'text', 'swatch', etc.
                $table->string('__typename')->default('AttributeSet');
            });
        }
    }
}
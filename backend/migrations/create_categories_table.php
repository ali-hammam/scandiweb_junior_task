<?php
namespace Migrations;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

class CreateCategoriesTable
{
    public function up()
    {
        if (!Capsule::schema()->hasTable('categories')) {
            Capsule::schema()->create('categories', function (Blueprint $table) {
                $table->string('name')->primary();  // string primary key
                $table->string('__typename')->default('Category');
            });
        }
    }
}
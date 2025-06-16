<?php
namespace Migrations;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Database\Schema\Blueprint;

class CreateCurrenciesTable
{
    public function up()
    {
        if (!Capsule::schema()->hasTable('currencies')) {
            Capsule::schema()->create('currencies', function (Blueprint $table) {
                $table->string('label')->primary(); // 'USD', 'EUR'
                $table->string('symbol');
                $table->string('__typename')->default('Currency');
            });
        }
    }
}
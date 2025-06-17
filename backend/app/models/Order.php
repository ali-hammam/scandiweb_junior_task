<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model {
    protected $table = 'orders';
    protected $fillable = ['product_id', 'unit_price', 'quantity', 'attributes'];
    protected $casts = [
        'attributes' => 'array',
        'product_id' => 'string',
        'unit_price' => 'float',
        'quantity' => 'integer'
    ];
}

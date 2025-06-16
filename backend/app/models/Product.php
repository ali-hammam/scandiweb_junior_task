<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model {
    protected $table = 'products';

    protected $casts = [
        'id' => 'string',
    ];

    public function productPrice()
    {
        return $this->hasOne(ProductPrice::class, 'product_id', 'id');
    }
}

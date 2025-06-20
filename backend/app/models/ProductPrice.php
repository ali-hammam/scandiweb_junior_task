<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPrice extends Model {
    protected $table = 'product_prices';

    public function product()
    {
        $this->belongsTo(Product::class);
    }
}

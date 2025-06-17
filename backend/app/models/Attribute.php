<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model {
    protected $table = 'attributes';

    public function productAttributes() {
        return $this->hasMany(ProductAttribute::class, 'attribute_id');
    }

    public function attributeItems() {
        return $this->hasMany(AttributeItem::class, 'attribute_id');
    }
}

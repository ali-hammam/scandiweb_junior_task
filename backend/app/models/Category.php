<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {
    protected $table = 'categories';
    protected $primaryKey = 'name';
    protected $casts = [
        'name' => 'string',
    ];
}

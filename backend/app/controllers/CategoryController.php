<?php

namespace App\Controllers;

use App\Models\Category;

class CategoryController
{
    public function getCategories()
    {
        return Category::all();
    }
}
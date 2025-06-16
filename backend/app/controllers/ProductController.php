<?php

namespace App\Controllers;

use App\Models\Product;

class ProductController
{
    public function getProducts() {
        return $this->transformProducts(Product::all());
    }

    public function getProduct($id) {
        $product = Product::find($id);
        if ($product) {
            $product->gallery = json_decode($product->gallery, true);
            $product->attributes = json_decode($product->attributes, true);
        }

        return $product;
    }
    public function getProductByCategory($categoryId) {
        $products = Product::where('category_id', $categoryId)->get();

        return $this->transformProducts($products);
    }

    public function transformProducts($products) {
        $products->transform(function ($product) {
            $product->gallery = json_decode($product->gallery, true);
            $product->attributes = json_decode($product->attributes, true);
            return $product;
        });

        return $products;
    }
}
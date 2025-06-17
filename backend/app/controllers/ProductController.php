<?php

namespace App\Controllers;

use App\Models\Attribute;
use App\Models\AttributeItem;
use App\Models\Product;
use App\Models\ProductAttribute;

class ProductController
{
    public function getProducts() {
        return $this->transformProducts(Product::all());
    }

    public function getProduct($id) {
        $product = Product::find($id);
        if ($product) {
            $product->gallery = json_decode($product->gallery, true);
            //$product->attributes = $this->formatProduct($product);
        }

        return $product;
    }
    public function getProductByCategory($categoryId) {
        $products = Product::where('category_id', $categoryId)->get();

        return $this->transformProducts($products);
    }

    public function formatProduct($product) {
        $productAttributes = ProductAttribute::where('product_id', $product->id)->get();

        return $productAttributes->map(function($pa) {
            $attribute = Attribute::find($pa->attribute_id);
            $itemIds = json_decode($pa->item_ids, true);
            $items = AttributeItem::whereIn('id', $itemIds)->get();

            return [
                'id' => (string) $attribute->id,
                'name' => $attribute->name,
                'type' => $attribute->type,
                'items' => $items->map(function($item) {
                    return [
                        'id' => (string) $item->id,
                        'value' => $item->value,
                        'displayValue' => $item->display_value,
                    ];
                })->toArray()
            ];
        })->toArray();
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
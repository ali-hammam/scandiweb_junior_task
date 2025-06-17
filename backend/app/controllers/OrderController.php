<?php

namespace App\Controllers;

use App\Models\Order;

class OrderController
{
    public function addOrder($args)
    {
        $createdOrders = [];

        foreach ($args['orders'] as $orderData) {
            $order = new Order();
            $order->product_id = $orderData['product_id'];
            $order->unit_price = $orderData['unit_price'];
            $order->quantity = $orderData['quantity'];
            $order->attributes = json_encode($orderData['attributes']);
            $order->save();

            $createdOrders[] = [
                'product_id' => $order->product_id,
                'unit_price' => $order->unit_price,
                'quantity' => $order->quantity,
                'attributes' => array_map(function ($attr) {
                    return [
                        'key' => $attr['key'],
                        'value' => $attr['value']
                    ];
                }, json_decode($order->attributes, true) ?? [])
            ];
        }

        return $createdOrders;
    }

}
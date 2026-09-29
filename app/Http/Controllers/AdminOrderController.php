<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Products;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    public function index()
    {
        // $status = $request->query('status', 'pending');
        // $orders = Order::where('status', $status)->get();
        $orders = Order::get();
        return response()->json($orders);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:return,inProgress,completed,pending',
        ]);

        if ($validatedData['status'] === 'return') {
            foreach ($order->orderItems as $orderItem) {
                $product = Products::find($orderItem->product_id);
                if ($product) {
                    $product->quantity += $orderItem->quantity;
                    $product->save();
                }

            }

        }


        $order->status = $validatedData['status'];
        $order->save();

        return response()->json(['message' => 'Order status updated successfully', 'order' => $order]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Products;
use DB;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //     public function store(Request $request)
//     {
//         $validatedData = $request->validate([
//             'full_name' => 'required|string|max:255',
//             'mobile_number' => 'required|string|max:15',
//             'shipping_city' => 'required|string|max:255',
//             'shipping_address' => 'required|string|max:255',
//             'products' => 'required|array',
//             'products.*.id' => 'required|exists:products,id',
//             'products.*.quantity' => 'required|integer|min:1',
//             'products.*.price' => 'required',
//             'total_amount' => 'required|numeric|min:0',
//         ]);

    //         $order = Order::create([
//             'user_id' => auth()->user()->id,
//             'status' => 'pending',
//             'full_name' => $validatedData['full_name'],
//             'mobile_number' => $validatedData['mobile_number'],
//             'shipping_city' => $validatedData['shipping_city'],
//             'shipping_address' => $validatedData['shipping_address'],
//             'total_amount' => $validatedData['total_amount'],
//         ]);

    //         foreach ($validatedData['products'] as $product) {
//             OrderItem::create([
//                 'order_id' => $order->id,
//                 'product_id' => $product['id'],
//                 'quantity' => $product['quantity'],
//                 'price' => $product['price'],
//             ]);
//             $productModel = Products::find($product['id']);
//             if ($productModel) {
//                 $productModel->quantity -= $product['quantity'];
//                 $productModel->save();
//             }

    //         }

    //         return response()->json(['message' => 'Order placed successfully', 'order' => $order], 201);
//     }
// }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'full_name' => 'required|string|max:255',
            'mobile_number' => 'required|string|max:15',
            'shipping_city' => 'required|string|max:255',
            'shipping_address' => 'required|string|max:255',
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.price' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
            // 'payment_status' => 'required|string|in:pending,completed,failed',
        ]);

        DB::beginTransaction();

        try {
            // Create the order
            $order = Order::create([
                'user_id' => auth()->user()->id,
                'status' => 'pending',
                'full_name' => $validatedData['full_name'],
                'mobile_number' => $validatedData['mobile_number'],
                'shipping_city' => $validatedData['shipping_city'],
                'shipping_address' => $validatedData['shipping_address'],
                'total_amount' => $validatedData['total_amount'],
            ]);

            // Create order items and decrement product quantity
            foreach ($validatedData['products'] as $product) {
                // OrderItem::create([
                //     'order_id' => $order->id,
                //     'product_id' => $product['id'],
                //     'quantity' => $product['quantity'],
                //     'price' => $product['price'],
                // ]);
                // $productModel = Products::find($product['id']);
                // if ($productModel) {
                //     $productModel->quantity -= $product['quantity'];
                //     $productModel->save();
                // }
                $productModel = Products::find($product['id']);
                if ($productModel && $productModel->quantity >= $product['quantity']) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $product['id'],
                        'quantity' => $product['quantity'],
                        'price' => $product['price'],
                    ]);
                    $productModel->quantity -= $product['quantity'];
                    $productModel->save();
                } else {
                    // Rollback the transaction and return an error message
                    DB::rollBack();
                    return response()->json(['message' => 'Order placement failed', 'error' => 'Insufficient quantity for product ID: ' . $product['id']], 400);
                }
            }

            // Create payment record
            $payment = Payment::create([
                'order_id' => $order->id,
                'payment_method' => $validatedData['payment_method'],
                // 'payment_status' => $validatedData['payment_status'],
                'amount' => $validatedData['total_amount'],
            ]);

            DB::commit();

            return response()->json(['message' => 'Order placed successfully', 'order' => $order, 'payment' => $payment], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Order placement failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $orders = Order::where('user_id', $user->id)->get();

        return response()->json($orders);
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        if ($order->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $order->status = 'return';
        // if ($validatedData['status'] === 'return') {
        foreach ($order->orderItems as $orderItem) {
            $product = Products::find($orderItem->product_id);
            if ($product) {
                $product->quantity += $orderItem->quantity;
                $product->save();
            }

        }

        // }
        $order->save();

        return response()->json(['message' => 'Order status updated successfully', 'order' => $order]);
    }
}
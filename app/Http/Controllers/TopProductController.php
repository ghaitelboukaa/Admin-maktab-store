<?php

namespace App\Http\Controllers;

use App\Models\TopProducts;
use Illuminate\Http\Request;

class TopProductController extends Controller
{


    public function index()
    {
        $topProducts = TopProducts::with('product')->get(); // Eager load the associated product
        $topProducts->transform(function ($item, $key) {
            $item['image'] = asset("images/{$item->product->image}"); // Access image from the related product
            return $item;
        });
        return response()->json($topProducts);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id', // Ensure the product exists
            'offer' => 'nullable|string',
        ]);

        // Check if the product is already a top product
        $existingTopProduct = TopProducts::where('product_id', $request->product_id)->first();

        if ($existingTopProduct) {
            return response()->json(['message' => 'Product is already a Special product'], 422);
        }

        // Check if the maximum number of top products (4) has been reached
        if (TopProducts::count() >= 4) {
            return response()->json(['message' => 'Maximum number of Special products reached'], 422);
        }

        // Create a new top product
        $topProduct = new TopProducts();
        $topProduct->product_id = $request->product_id;
        $topProduct->offer = $validatedData['offer'];
        $topProduct->save();

        return response()->json(['message' => 'Special product selected successfully']);
    }

    public function destroy($id)
    {
        // Find the special product by ID
        $specialProduct = TopProducts::find($id);

        // Check if the special product exists
        if (!$specialProduct) {
            return response()->json(['message' => 'Special product not found'], 404);
        }

        // Delete the special product
        $specialProduct->delete();

        // Return a success response
        return response()->json(['message' => 'Special product deleted successfully'], 200);
    }
}

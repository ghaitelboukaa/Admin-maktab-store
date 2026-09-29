<?php

namespace App\Http\Controllers;

use App\Models\Lists;
use Illuminate\Http\Request;

class ListController extends Controller
{
    public function store(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'list_name' => 'required|string|max:255',
            'school' => 'nullable|string|max:255',
            'level' => 'nullable|string|max:255',
            'products' => 'required|array',
            'products.*' => 'exists:products,id',
        ]);

        // Create the list
        $list = Lists::create([
            'list_name' => $validatedData['list_name'],
            'school' => $validatedData['school'],
            'level' => $validatedData['level'],
        ]);

        // Attach selected products to the list
        $list->products()->attach($validatedData['products']);

        return response()->json(['message' => 'List created successfully', 'list' => $list], 201);
    }

    public function index(Request $request)
    {
        $page = $request->get('page');
        $perPage = $request->get('perPage');
        $query = $request->get('query');
        $listsQuery = Lists::query();

        if ($query) {
            $listsQuery->where('list_name', 'like', '%' . $query . '%')->orWhere('school', 'like', '%' . $query . '%');
        }

        $lists = $listsQuery->with('products')->paginate($perPage, ['*'], 'page', $page);

        $lists->getCollection()->transform(function ($list) {
            $totalPrice = $list->products->sum(function ($product) {
                return $product->price;
            });

            $totalNewPrice = $list->products->sum(function ($product) {
                return $product->newprice ?? $product->price;
            });

            $list->total_price = $totalPrice;
            $list->total_new_price = $totalNewPrice;
            return $list;
        });

        return response()->json($lists);
    }


    public function show($listId)
    {



        $list = Lists::with('products')->findOrFail($listId);

        foreach ($list->products as $product) {
            $product->image = asset("images/{$product->image}");
        }


        return response()->json($list);
    }


    public function destroy($id)
    {
        $list = Lists::findOrFail($id);
        $list->delete();

        return response()->json(['message' => 'list deleted successfully'], 200);
    }

}

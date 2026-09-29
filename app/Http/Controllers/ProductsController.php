<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use App\Models\Notebook;
use App\Models\Products;
use App\Models\Rating;
use App\Models\SchoolSupply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->get('query');
        $categoryID = $request->get('selectedValue');
        $rating = $request->get('rating');
        $minPrice = $request->get('minPrice');
        $maxPrice = $request->get('maxPrice');
        $page = $request->get('page');
        $perPage = $request->get('perPage');

        $productsQuery = Products::query();

        if ($query) {
            $productsQuery->where('name', 'like', '%' . $query . '%');
        }
        if ($categoryID) {
            $productsQuery->where('category_id', $categoryID);

        }
        if ($rating) {
            $productsQuery->where('rating', '=', $rating);
        }
        if ($minPrice) {
            $productsQuery->where('price', '>=', $minPrice);
        }

        if ($maxPrice) {
            $productsQuery->where('price', '<=', $maxPrice);
        }

        $products = $productsQuery->with('category')->with('topProduct')->paginate($perPage, ['*'], 'page', $page);

        $products->transform(function ($item, $key) {
            $item['image'] = asset("images/{$item['image']}");
            return $item;
        });

        return response()->json($products);


    }

    public function getTopRatedProducts()
    {

        $categories = Category::all();

        // Initialize an array to store top-rated products for each category
        $topRatedProducts = [];

        // Loop through each category
        foreach ($categories as $category) {
            // Fetch top 3 products for the current category
            $products = Products::where('category_id', $category->id)
                ->with('category')
                ->orderByDesc('rating')
                ->take(3)
                ->get();
            $products->transform(function ($item, $key) {
                $item['image'] = asset("images/{$item['image']}");
                return $item;
            });

            $topRatedProducts[$category->id] = $products;
        }

        return response()->json($topRatedProducts);

    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {



    //     $validationRules = [
    //         'name' => 'required|string|max:255',
    //         'description' => 'required|string',
    //         'price' => 'required|numeric|min:0',
    //         'quantity' => 'required|numeric|min:0',
    //         'category_id' => 'required',
    //         'image' => 'required', // Assuming image upload
    //     ];

    //     // Conditional validation rules based on category  book===1  notebook====2
    //     if ($request->input('category_id') === '1') {
    //         $validationRules['level'] = 'required|string';
    //     } elseif ($request->input('category_id') === '2') {
    //         $validationRules['brand'] = 'required|string';
    //         $validationRules['size'] = 'required|string';
    //         $validationRules['number_of_pages'] = 'required|integer|min:50';
    //     } elseif ($request->input('category_id') === '3') {
    //         $validationRules['type'] = 'required|string';
    //         $validationRules['size'] = 'required|string';
    //         $validationRules['brand'] = 'required|string';
    //     }


    //     $validatedData = $request->validate($validationRules);


    //     if ($request->hasFile('image')) {
    //         $image = $request->file('image');
    //         $imageName = time() . '.' . $image->getClientOriginalExtension();
    //         $image->move(public_path('images'), $imageName);
    //         $validatedData['image'] = $imageName;
    //     }

    //     $product = Products::create($validatedData);

    //     if (!$product) {
    //         return response()->json(['error' => 'Product creation failed'], 500);
    //     }

    //     if ($product->category->name === 'book') {
    //         $productCat = Book::create([
    //             'products_id' => $product->id,
    //             'title' => $product->name,
    //             'level' => $validatedData['level'],
    //         ]);
    //     }
    //     if ($product->category->name === 'notebook') {
    //         $productCat = Notebook::create([
    //             'products_id' => $product->id,
    //             'brand' => $validatedData['brand'],
    //             'size' => $validatedData['size'],
    //             'number_of_pages' => $validatedData['number_of_pages'],
    //         ]);
    //     }
    //     if ($product->category->name === 'school supplies') {
    //         $productCat = SchoolSupply::create([
    //             'products_id' => $product->id,
    //             'brand' => $validatedData['brand'],
    //             'name' => $product->name,
    //             'size' => $validatedData['size'],
    //             'type' => $validatedData['type'],
    //         ]);
    //     }

    //     if (!$productCat) {
    //         return response()->json(['error' => 'Product creation failed'], 500);
    //     }

    //     return response()->json($product, 200);
    // }

    public function store(Request $request)
    {
        $validationRules = [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id', // Assuming 'categories' is the table name
            'image' => 'required|image', // Assuming image upload
        ];

        // Conditional validation rules based on category
        if ($request->input('category_id') === '1') {
            $validationRules['level'] = 'required|string';
        } elseif ($request->input('category_id') === '2') {
            $validationRules['brand'] = 'required|string';
            $validationRules['size'] = 'required|string';
            $validationRules['number_of_pages'] = 'required|integer|min:50';
        } elseif ($request->input('category_id') === '3') {
            $validationRules['type'] = 'required|string';
            $validationRules['size'] = 'required|string';
            $validationRules['brand'] = 'required|string';
        }

        $validatedData = $request->validate($validationRules);

        // File upload
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images'), $imageName);
        $validatedData['image'] = $imageName;

        $product = Products::create($validatedData);

        if (!$product) {
            return response()->json(['error' => 'Product creation failed'], 500);
        }

        $categorySpecificData = [];
        switch ($request->input('category_id')) {
            case '1':
                $categorySpecificData = [
                    'products_id' => $product->id,
                    'title' => $validatedData['name'],
                    'level' => $validatedData['level'],
                ];
                break;
            case '2':
                $categorySpecificData = [
                    'products_id' => $product->id,
                    'brand' => $validatedData['brand'],
                    'size' => $validatedData['size'],
                    'number_of_pages' => $validatedData['number_of_pages'],
                ];
                break;
            case '3':
                $categorySpecificData = [
                    'products_id' => $product->id,
                    'brand' => $validatedData['brand'],
                    'name' => $validatedData['name'],
                    'size' => $validatedData['size'],
                    'type' => $validatedData['type'],
                ];
                break;
            default:
                break;
        }

        $productCat = null;
        // if (!empty($categorySpecificData)) {
        //     $categoryClassName = ucfirst(Category::find($request->input('category_id'))->name); // Assuming 'categories' table contains category names
        //     $productCat = $categoryClassName::create($categorySpecificData);
        // }

        if ($request->input('category_id') === '1') {
            $productCat = Book::create([
                'products_id' => $product->id,
                'title' => $validatedData['name'],
                'level' => $validatedData['level'],
            ]);
        } elseif ($request->input('category_id') === '2') {
            $productCat = Notebook::create([
                'products_id' => $product->id,
                'brand' => $validatedData['brand'],
                'size' => $validatedData['size'],
                'number_of_pages' => $validatedData['number_of_pages'],
            ]);
        } elseif ($request->input('category_id') === '3') {
            $productCat = SchoolSupply::create([
                'products_id' => $product->id,
                'brand' => $validatedData['brand'],
                'name' => $validatedData['name'],
                'size' => $validatedData['size'],
                'type' => $validatedData['type'],
            ]);
        }

        if (!$productCat) {
            return response()->json(['error' => 'Category-specific product creation failed'], 500);
        }

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product,
        ], 200);
    }


    /**
     * Display the specified resource.
     */
    public function show($productId)
    {
        // $product = Products::findOrFail($productId);
        $product = Products::findOrFail($productId);

        if ($product->category_id == '1') {
            // Load product with book
            $product = Products::with('category')->with('book')->findOrFail($productId);
        } elseif ($product->category_id == '2') {
            // Load product with notebook
            $product = Products::with('category')->with('notebookk')->findOrFail($productId);
        } elseif ($product->category_id == '3') {
            $product = Products::with('category')->with('school_supply')->findOrFail($productId);
        }

        $product->image = asset("images/{$product->image}");
        return response()->json($product);
    }
    public function getProductsByCategory($categoryId)
    {
        $products = Products::where('category_id', $categoryId)->get();
        return response()->json($products);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $productId)
    {
        $product = Products::findOrFail($productId);

        $validationRules = [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required',
            // 'image' => 'required',
            'newprice' => [
                'numeric',
                'min:0',
                function ($attribute, $value, $fail) use ($request) {
                    $price = $request->input('price');
                    if ($value >= $price) {
                        $fail('The ' . $attribute . ' must be less than the price.');
                    }
                },
            ],
            'quantity' => 'required|numeric|min:0',
        ];

        if ($request->input('category_id') === 1) {
            $validationRules['level'] = 'required'; // Add level validation for book category
        } elseif ($request->input('category_id') === 2) {
            $validationRules['brand'] = 'required|string';
            $validationRules['size'] = 'required|string';
            $validationRules['number_of_pages'] = 'required|integer|min:50';
        } elseif ($request->input('category_id') === 3) {
            $validationRules['type'] = 'required|string';
            $validationRules['size'] = 'required|string';
            $validationRules['brand'] = 'required|string';
        }


        // Perform validation
        $validatedData = $request->validate($validationRules);

        // if ($request->hasFile('image')) {
        //     $image = $request->file('image');
        //     $imageName = time() . '.' . $image->getClientOriginalExtension();
        //     $image->move(public_path('images'), $imageName);
        //     $validatedData['image'] = $imageName;
        // }

        $product->update($validatedData);

        if ($product->category->name === 'book') {
            $book = Book::where('products_id', $product->id)->firstOrFail();
            $book->update([
                'title' => $product->name,
                'level' => $validatedData['level'],
            ]);
        }

        if ($product->category->name === 'notebook') {
            $notebook = Notebook::where('products_id', $product->id)->firstOrFail();
            $notebook->update([
                'products_id' => $product->id,
                'brand' => $validatedData['brand'],
                'size' => $validatedData['size'],
                'number_of_pages' => $validatedData['number_of_pages'],
            ]);
        }
        if ($product->category->name === 'school supplies') {
            $school_supply = SchoolSupply::where('products_id', $product->id)->firstOrFail();
            $school_supply->update([
                'products_id' => $product->id,
                'brand' => $validatedData['brand'],
                'name' => $product->name,
                'size' => $validatedData['size'],
                'type' => $validatedData['type'],
            ]);
        }


        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Products::findOrFail($id);


        if ($product->category->name === 'book') {
            $book = Book::where('products_id', $product->id)->first();
            if ($book) {
                $book->delete();
            }
        }
        if ($product->category->name === 'notebook') {
            $notebook = Notebook::where('products_id', $product->id)->first();
            if ($notebook) {
                $notebook->delete();
            }
        }
        if ($product->category->name === 'school supplies') {
            $school_supply = SchoolSupply::where('products_id', $product->id)->first();
            if ($school_supply) {
                $school_supply->delete();
            }
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }


    public function rate(Request $request, $id)
    {
        $product = Products::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        // Validate rating value
        $request->validate([
            'rating' => 'required|integer|between:1,5',
        ]);

        // Create or update rating
        $rating = Rating::updateOrCreate(
            ['product_id' => $product->id, 'user_id' => auth()->id()],
            ['rating' => $request->rating]
        );

        // Recalculate average rating for product
        $product->rating = $product->ratings()->avg('rating');
        $product->save();

        return response()->json(['message' => 'Rating saved successfully', 'product' => $product]);
    }
}


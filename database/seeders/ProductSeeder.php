<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use App\Models\Notebook;
use App\Models\Product; // Updated model namespace
use App\Models\Products;
use App\Models\SchoolSupply;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define products
        $products = [
            [
                'name' => 'المفيد في اللغة العربية',
                'description' => 'Description for Book 1',
                'price' => 10.99,
                'image' => 'mk1.jpg',
                'quantity' => 3,
                'category_name' => 'book', // Add category name
            ],
         
            [
                'name' => 'Notebook 1',
                'description' => 'Description for Notebook 1',
                'price' => 5.99,
                'image' => 'mk2.jpg',
                'quantity' => 3,
                'category_name' => 'notebook', // Add category name
            ],
            [
                'name' => 'اقلام ملونة',
                'description' => 'Description for School Supplies 1',
                'price' => 3.49,
                'image' => 'mk3.jpg',
                'quantity' => 3,
                'category_name' => 'school supplies', // Add category name
            ],
            // Add more products as needed
        ];

        foreach ($products as $product) {
            // Find the category by name
            $category = Category::where('name', $product['category_name'])->first();

            // If category not found, skip this product
            if (!$category) {
                continue;
            }

            // Create the product and associate it with the category

            $newProduct = Products::create([
                'name' => $product['name'],
                'description' => $product['description'],
                'price' => $product['price'],
                'image' => $product['image'],
                'quantity' => $product['quantity'],
                'category_id' => $category->id, // Assign category ID
            ]);

            // If the product belongs to the book category, also create a record in the books table
            if ($product['category_name'] === 'book') {
                Book::create([
                    'products_id' => $newProduct->id,
                    'title' => $product['name'],
                    'level' => 'Intermediate',
                    // Add other book-specific fields here if needed
                ]);
            }

            if ($product['category_name'] === 'notebook') {
                Notebook::create([
                    'products_id' => $newProduct->id,
                    'number_of_pages' => 200,
                    'size' => 'A4',
                    'brand' => 'Sample Brand',
                ]);
            }

            if ($product['category_name'] === 'school supplies') {
                SchoolSupply::create([
                    'products_id' => $newProduct->id,
                    'name' => $product['name'],
                    'type' => 'Drawing',
                    'size' => 'Medium',
                    'brand' => 'Sample Brand',
                ]);
            }

        }
    }
}

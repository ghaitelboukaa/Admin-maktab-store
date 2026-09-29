<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        // Define categories
        $categories = [
            ['name' => 'book'],
            ['name' => 'notebook'],
            ['name' => 'school supplies'],
        ];

        // Insert categories into the database
        Category::insert($categories);
    }
}


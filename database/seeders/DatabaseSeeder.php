<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Admins;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => '123456789',
        ]);

        Admins::factory()->create([
            'name' => 'Ghait el boukaa',
            'email' => 'ghait@elboukaa.com',
            'password' => '$2y$12$8znNvvbnS2/i2M.I0o7sku.aiWN8StNs4re6W8byeC7m2CGUK00iG',
        ]);
    }
}

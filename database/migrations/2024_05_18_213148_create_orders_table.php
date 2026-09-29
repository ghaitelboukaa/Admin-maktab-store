<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            // $table->date('order_date');
            $table->string('shipping_address');
            $table->string('shipping_city');
            $table->string('mobile_number'); // New column
            $table->string('full_name');
            // $table->string('shipping_country');
            $table->decimal('total_amount', 10, 2);
            $table->string('status'); // e.g., pending, shipped, delivered, canceled
           
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

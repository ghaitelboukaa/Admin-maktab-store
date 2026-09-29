<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('top_products', function (Blueprint $table) {
            $table->string('offer')->nullable(); // Add the 'offer' column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('top_products', function (Blueprint $table) {
            $table->dropColumn('offer'); // Remove the 'offer' column if rolled back
        });
    }
};

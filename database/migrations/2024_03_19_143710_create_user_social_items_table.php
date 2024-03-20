<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
// Model
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_social_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('url');
            $table->string('icon');
            $table->timestamps();
            $table->foreignIdFor(User::class)
                  ->constrained()
                  ->cascadeOnDelete()
                  ->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_social_items');
    }
};

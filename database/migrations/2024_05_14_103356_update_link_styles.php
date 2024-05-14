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
        Schema::table('link_styles', function (Blueprint $table) {
            // Drop the existing column
            $table->dropColumn('schema');

            // Add the new column
            $table->string('class'); // Change the type as needed          //
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('link_styles', function (Blueprint $table) {
            // Add the dropped column back
            $table->string('schema'); // Change the type as needed

            // Drop the new column
            $table->dropColumn('class');//
        });
    }
};

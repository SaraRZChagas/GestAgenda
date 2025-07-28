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
        Schema::table('professionals', function (Blueprint $table) {
        $table->dropForeign(['idUsers']);
        $table->foreign('idUsers')->references('id')->on('users')->onDelete('cascade');
        });


         Schema::table('customers', function (Blueprint $table) {
        $table->dropForeign(['idUsers']);
        $table->foreign('idUsers')->references('id')->on('users')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('professionals', function (Blueprint $table) {
            $table->dropForeign(['idUsers']);
            $table->foreign('idUsers')->references('id')->on('users')->onDelete('restrict');
        });

        Schema::table('customers', function (Blueprint $table) {
            $table->dropForeign(['idUsers']);
            $table->foreign('idUsers')->references('id')->on('users')->onDelete('restrict');
        });
    }
};

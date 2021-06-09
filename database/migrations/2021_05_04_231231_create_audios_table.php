<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAudiosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('audios', function (Blueprint $table) {
            $table->id();
            $table->string('audio')->nullable();
            $table->string('name')->nullable();
            $table->string('username')->nullable();
            $table->string('ft')->nullable();
            $table->string('album')->nullable();
            $table->string('genre')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('description')->nullable();
            $table->string('released')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('audios');
    }
}

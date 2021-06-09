<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('username')->nullable();
            $table->string('text')->nullable();
            $table->string('media')->nullable();
            $table->string('parameter_1')->nullable();
            $table->string('parameter_2')->nullable();
            $table->string('parameter_3')->nullable();
            $table->string('parameter_4')->nullable();
            $table->string('parameter_5')->nullable();
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
        Schema::dropIfExists('posts');
    }
}

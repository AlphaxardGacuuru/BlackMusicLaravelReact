<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoughtVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bought_videos', function (Blueprint $table) {
            $table->id();
            $table->string('video_id')->nullable();
            $table->string('reference')->nullable();
            $table->string('username')->nullable();
            $table->string('name')->nullable();
            $table->string('artist')->nullable();
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
        Schema::dropIfExists('bought_videos');
    }
}

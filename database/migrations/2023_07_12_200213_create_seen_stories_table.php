<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeenStoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seen_stories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('story_id')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string("username");
            $table->timestamp("seen_at");
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
        Schema::dropIfExists('seen_stories');
    }
}

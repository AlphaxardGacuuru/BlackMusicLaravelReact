<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->rememberToken()->nullable();
            $table->string('phone')->unique()->nullable();
            $table->string('gender')->nullable();
            $table->string('account_type')->default('normal')->nullable();
            $table->string('avatar')->default('profile-pics/male_avatar.png')->nullable();
            $table->string('backdrop')->default('img/headphones.jpg')->nullable();
            $table->string('bio')->nullable();
            $table->string('dob')->nullable();
            $table->string('location')->nullable();
            $table->string('withdrawal')->nullable();
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
        Schema::dropIfExists('users');
    }
}

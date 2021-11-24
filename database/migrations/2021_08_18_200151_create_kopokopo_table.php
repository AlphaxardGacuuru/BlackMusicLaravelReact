<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKopokopoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kopokopo', function (Blueprint $table) {
            $table->id();
            $table->string('kopokopo_id')->nullable();
            $table->string('type')->nullable();
            $table->string('initiationTime')->nullable();
            $table->string('status')->nullable();
            $table->string('eventType')->nullable();
            $table->string('resourceId')->nullable();
            $table->string('reference')->nullable();
            $table->string('originationTime')->nullable();
            $table->string('senderPhoneNumber')->nullable();
            $table->string('amount')->nullable();
            $table->string('currency')->nullable();
            $table->string('tillNumber')->nullable();
            $table->string('system')->nullable();
            $table->string('resourceStatus')->nullable();
            $table->string('senderFirstName')->nullable();
            $table->string('senderMiddleName')->nullable();
            $table->string('senderLastName')->nullable();
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
        Schema::dropIfExists('kopokopo');
    }
}

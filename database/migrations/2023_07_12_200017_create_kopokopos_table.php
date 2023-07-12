<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKopokoposTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kopokopos', function (Blueprint $table) {
            $table->id();
            $table->string('kopokopo_id')->nullable();
            $table->string('type')->nullable();
            $table->string('initiation_time')->nullable();
            $table->string('status')->nullable();
            $table->string('event_type')->nullable();
            $table->string('resource_id')->nullable();
            $table->string('reference')->nullable();
            $table->string('origination_time')->nullable();
            $table->string('sender_phone_number')->nullable();
            $table->string('amount')->nullable();
            $table->string('currency')->nullable();
            $table->string('till_number')->nullable();
            $table->string('system')->nullable();
            $table->string('resource_status')->nullable();
            $table->string('sender_first_name')->nullable();
            $table->string('sender_middle_name')->nullable();
            $table->string('sender_last_name')->nullable();
            $table->string('username')->nullable();
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
        Schema::dropIfExists('kopokopos');
    }
}

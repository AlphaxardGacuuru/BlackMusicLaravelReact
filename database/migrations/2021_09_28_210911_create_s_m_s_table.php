<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSMSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('s_m_s', function (Blueprint $table) {
            $table->id();
            $table->char('message_id')->nullable();
            $table->char('number')->nullable();
            $table->char('text')->nullable();
            $table->char('status')->nullable();
            $table->char('status_code')->nullable();
            $table->char('cost')->nullable();
            // Delivery
            $table->char('delivery_status')->nullable();
            $table->char('network_code')->nullable();
            $table->char('failure_reason')->nullable();
            $table->char('retry_count')->nullable();
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
        Schema::dropIfExists('s_m_s');
    }
}

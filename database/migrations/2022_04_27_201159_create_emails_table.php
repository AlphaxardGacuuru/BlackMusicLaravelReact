<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('emails', function (Blueprint $table) {
            $table->id();
			$table->string('recipient')->nullable();
			$table->string('sender')->nullable();
			$table->string('from')->nullable();
			$table->string('subject')->nullable();
			$table->string('body_plain')->nullable();
			$table->string('stripped_text')->nullable();
			$table->string('stripped_signature')->nullable();
			$table->string('body_html')->nullable();
			$table->string('stripped_html')->nullable();
			$table->string('attachment_count')->nullable();
			$table->string('attachment_x')->nullable();
			$table->string('timestamp')->nullable();
			$table->string('token')->nullable();
			$table->string('signature')->nullable();
			$table->string('message_headers')->nullable();
			$table->string('content_id_map')->nullable();
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
        Schema::dropIfExists('emails');
    }
}

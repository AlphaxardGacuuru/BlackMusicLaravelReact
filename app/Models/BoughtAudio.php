<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BoughtAudio extends Model
{
	protected $table = 'bought_audios';

	public function audio()
	{
		return $this->belongsTo(Audio::class);
	}
}

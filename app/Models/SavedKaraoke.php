<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SavedKaraoke extends Model
{
	public function karaoke()
	{
		return $this->belongsTo(Karaoke::class);
	}
}

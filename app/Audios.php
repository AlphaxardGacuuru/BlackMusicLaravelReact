<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Audios extends Model
{
    public function audioLikes()
	{
		return $this->hasMany('App\AudioLikes', 'audio_id');
	}
}

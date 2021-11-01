<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Audios extends Model
{
    public function audioLikes()
	{
		return $this->hasMany('App\AudioLikes', 'audio_id');
	}

	public function albums()
	{
		return $this->belongsTo('App\AudioAlbums', 'album', 'id');
	}

	public function users()
	{
		return $this->belongsTo('App\User', 'username', 'username');
	}
}

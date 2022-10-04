<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Audios extends Model
{
    public function likes()
	{
		return $this->hasMany('App\AudioLikes', 'audio_id');
	}

	public function bought()
	{
		return $this->hasMany('App\BoughtAudios', 'audio_id');
	}

	public function cart()
	{
		return $this->hasMany('App\CartVideos', 'audio_id');
	}

	public function albums()
	{
		return $this->belongsTo('App\AudioAlbums', 'album');
	}

	public function users()
	{
		return $this->belongsTo('App\User', 'username', 'username');
	}
}

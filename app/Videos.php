<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Videos extends Model
{
	public function videoLikes()
	{
		return $this->hasMany("App\VideoLikes", "video_id", "id");
	}

	public function albums()
	{
		return $this->belongsTo('App\VideoAlbums', 'album', 'id');
	}

	public function users()
	{
		return $this->belongsTo('App\User', 'username', 'username');
	}
}

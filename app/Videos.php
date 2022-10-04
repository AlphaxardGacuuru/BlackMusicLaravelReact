<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Videos extends Model
{
	public function likes()
	{
		return $this->hasMany("App\VideoLikes", "video_id");
	}

	public function bought()
	{
		return $this->hasMany('App\BoughtVideos', 'video_id');
	}

	public function cart()
	{
		return $this->hasMany('App\CartVideos', 'video_id');
	}

	public function albums()
	{
		return $this->belongsTo('App\VideoAlbums', 'album');
	}

	public function users()
	{
		return $this->belongsTo('App\User', 'username', 'username');
	}
}

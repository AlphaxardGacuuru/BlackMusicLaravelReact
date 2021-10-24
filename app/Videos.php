<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Videos extends Model
{
	public function videoLikes()
	{
		return $this->hasMany("App\VideoLikes", "video_id", "id");
	}
}

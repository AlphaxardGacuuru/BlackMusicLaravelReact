<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AudioComments extends Model
{
    public function users()
    {
        return $this->belongsTo("App\User", "username", "username");
    }

    public function audioCommentLikes()
    {
        return $this->hasMany('App\AudioCommentLikes', 'comment_id');
    }

	public function audios()
	{
		return $this->belongsTo('App\Audios', 'audio_id', 'id');
	}
}

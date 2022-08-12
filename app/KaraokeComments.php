<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class KaraokeComments extends Model
{
    public function users()
    {
        return $this->belongsTo('App\User', 'username', 'username');
    }

    public function karaokeCommentLikes()
    {
        return $this->hasMany('App\KaraokeCommentLikes', 'comment_id');
    }

	public function karaokes()
	{
		return $this->belongsTo('App\Karaokes', 'karaoke_id', 'id');
	}
}

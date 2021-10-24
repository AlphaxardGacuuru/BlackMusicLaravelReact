<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VideoComments extends Model
{
    public function users()
    {
        return $this->belongsTo("App\User", "username", "username");
    }

    public function videoCommentLikes()
    {
        return $this->hasMany('App\VideoCommentLikes', 'comment_id');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostComments extends Model
{
    public function users()
    {
        return $this->belongsTo('App\User', 'username', 'username');
    }

    public function postCommentLikes()
    {
        return $this->hasMany('App\PostCommentLikes', 'comment_id');
    }

    public function posts()
    {
        return $this->belongsTo('App\Posts');
    }
}

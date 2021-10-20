<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    public function users()
    {
        return $this->belongsTo('App\User', 'username', 'username');
    }

    public function postLikes()
    {
        return $this->hasMany('App\PostLikes', 'post_id');
    }

    public function postComments()
    {
        return $this->hasMany('App\PostComments', 'post_id');
    }

    public function polls()
    {
        return $this->hasMany('App\Polls', 'post_id');
    }
}

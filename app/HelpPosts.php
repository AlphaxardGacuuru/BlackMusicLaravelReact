<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HelpPosts extends Model
{
    public function users()
    {
        return $this->belongsTo('App\User', 'username', 'username');
    }

    public function helpPostLikes()
    {
        return $this->hasMany('App\HelpPostLikes', 'help_post_id');
    }
}

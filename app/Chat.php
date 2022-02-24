<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    public function users()
    {
        return $this->belongsTo('App\User', 'username', 'username');
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Push extends Model
{
    protected $table = 'push_subscriptions';

    public function users()
    {
        return $this->belongsTo('App\User', 'username', 'username');
    }
}
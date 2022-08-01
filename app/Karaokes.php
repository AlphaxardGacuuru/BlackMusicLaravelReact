<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Karaokes extends Model
{
    public function karaokeLikes()
    {
        return $this->hasMany("App\KaraokeLikes", "karaoke_id", "id");
    }

    public function karaokeComments()
    {
        return $this->hasMany('App\KaraokeComments', 'karaoke_id', 'id');
    }

    public function users()
    {
        return $this->belongsTo('App\User', 'username', 'username');
    }

    public function audios()
    {
        return $this->belongsTo('App\Audios', 'audio_id', 'id');
    }
}

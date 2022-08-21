<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class KaraokeAudios extends Model
{
    public function audios()
    {
        return $this->belongsTo('App\Audios', 'audio_id', 'id');
    }
}

<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class KaraokeAudio extends Model
{
    protected $table = 'karaoke_audios';
	
    /*
     * Accesors.
     */

    protected function getThumbnailAttribute($value)
    {
        return "/storage/" . $value;
    }

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d M Y');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d M Y');
    }

	/*
	* Relationships
	*/

    public function audio()
    {
        return $this->belongsTo(Audio::class);
    }
}

<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class KaraokeAudio extends Model
{
    protected $table = 'karaoke_audios';

    /**
     * Accesors.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function thumbnail(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => "/storage/" . $value,
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    public function audio()
    {
        return $this->belongsTo(Audio::class);
    }
}

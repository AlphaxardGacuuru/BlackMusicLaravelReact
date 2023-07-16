<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Audio extends Model
{
    protected $table = "audios";

	protected $dates = ['released'];

    /**
     * Accesors.
     *
     */
    protected function getAudioAttribute($value)
    {
        return "/storage/" . $value;
    }

    protected function getThumbnailAttribute($value)
    {
        return "/storage/" . $value;
    }

    public function getReleasedAttribute($value)
    {
        return Carbon::parse($value)->format('d M Y');
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
	*	Relationships
	*/ 

    public function user()
    {
        return $this->belongsTo(User::class, 'username', 'username');
    }

    public function album()
    {
        return $this->belongsTo(AudioAlbum::class, 'audio_album_id');
    }

    public function likes()
    {
        return $this->hasMany(AudioLike::class);
    }

    public function comments()
    {
        return $this->hasMany(AudioComment::class);
    }

    public function bought()
    {
        return $this->hasMany(BoughtAudio::class);
    }

    public function cart()
    {
        return $this->hasMany(CartAudio::class, 'audio_id');
    }

    /*
     *    Custom Functions
     */

    // Check if user has liked audio
    public function hasLiked($username)
    {
        return $this->likes
            ->where('username', $username)
            ->count() > 0 ? true : false;
    }

    // Check if audio in cart
    public function inCart($username)
    {
        return $this->cart
            ->where('username', $username)
            ->count() > 0 ? true : false;
    }

    // Check if user has bought audio
    public function hasBoughtAudio($username)
    {
        return $this->bought
            ->where('username', $username)
            ->count() > 0 ? true : false;
    }
}

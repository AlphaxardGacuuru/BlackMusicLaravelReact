<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Audio extends Model
{
    protected $table = "audios";

	protected $dates = ['released'];

    /**
     * Accesors.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function audio(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => "/storage/" . $value
        );
    }

    protected function thumbnail(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => "/storage/" . $value,
        );
    }

    protected function released(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

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

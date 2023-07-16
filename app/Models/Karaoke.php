<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Karaoke extends Model
{
	
    /*
     * Accesors.
     */

    protected function getKaraokeAttribute($value)
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

    public function user()
    {
        return $this->belongsTo(User::class, 'username', 'username');
    }

    public function audio()
    {
        return $this->belongsTo(Audio::class);
    }

    public function savedKaraokes()
    {
        return $this->hasMany(SavedKaraoke::class);
    }

    public function likes()
    {
        return $this->hasMany(KaraokeLike::class);
    }

    public function comments()
    {
        return $this->hasMany(KaraokeComment::class);
    }

    /*
     *    Custom Functions
     */

    // Check if user has liked karaoke
    public function hasLiked($username)
    {
        return $this->likes
            ->where('username', $username)
            ->count() > 0 ? true : false;
    }

    // Check if user has saved karaoke
    public function hasSaved($username)
    {
        return $this->savedKaraokes
            ->where('username', $username)
            ->count() > 0 ? true : false;
    }
}

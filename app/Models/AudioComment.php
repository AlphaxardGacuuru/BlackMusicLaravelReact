<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class AudioComment extends Model
{
    /*
     * Accesors.
     */

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
		return $this->belongsTo(User::class, "username", "username");
	}

	public function audio()
	{
		return $this->belongsTo(Audio::class);
	}

	public function likes()
	{
		return $this->hasMany(AudioCommentLike::class);
	}

    /*
     *    Custom Functions
     */

    // Check if user has liked post
    public function hasLiked($username)
    {
        return $this->likes
            ->where('username', $username)
            ->count() > 0 ? true : false;
    }	
}

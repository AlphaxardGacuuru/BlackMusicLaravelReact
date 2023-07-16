<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class KaraokeComment extends Model
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
		return $this->belongsTo(User::class, 'username', 'username');
	}

	public function likes()
	{
		return $this->hasMany(KaraokeCommentLike::class);
	}

    /*
     *    Custom Functions
     */

    // Check if user has liked Comment
    public function hasLiked($username)
    {
        return $this->likes
            ->where('username', $username)
            ->count() > 0 ? true : false;
    }
}

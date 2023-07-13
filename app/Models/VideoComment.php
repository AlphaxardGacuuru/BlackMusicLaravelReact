<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class VideoComment extends Model
{
    /**
     * Accesors.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

	public function user()
	{
		return $this->belongsTo(User::class, "username", "username");
	}

	public function video()
	{
		return $this->belongsTo(Video::class);
	}

	public function likes()
	{
		return $this->hasMany(VideoCommentLike::class);
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

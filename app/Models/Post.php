<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * Accesors.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function media(): Attribute
    {
        return Attribute::make(
            get:fn($value) => $value ? "/storage/" . $value : $value,
        );
    }

    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get:fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get:fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'username', 'username');
    }

    public function likes()
    {
        return $this->hasMany(PostLike::class);
    }

    public function comments()
    {
        return $this->hasMany(PostComment::class);
    }

    public function commentLikes()
    {
        return $this->hasMany(PostCommentLike::class);
    }

    public function polls()
    {
        return $this->hasMany(Poll::class);
    }

    /*
     *    Custom Functions
     */

    /*
     * Check if user has voted for various parameters */
    public function hasVoted($post, $username, $parameter)
    {
        return $post->polls
            ->where('username', $username)
            ->where('parameter', $parameter)
            ->count() > 0 ? true : false;
    }

    /*
     * Get votes of each parameter as a percentage */
    public function percentage($post, $parameter)
    {
        $countParameter = $post->polls
            ->where('parameter', $parameter)
            ->count();

        $polls = $post->polls->count();

        $percentage = $countParameter > 0 ? $countParameter / $polls * 100 : 0;

        return round($percentage, 1);
    }

    /*
     * Check if poll is within 24Hrs */
    public function isWithin24Hrs()
    {
        return $this->created_at > Carbon::now()->subDays(1)->format("d M Y");
    }

    /*
     * Check if user has liked post */
    public function hasLiked($post, $username)
    {
        return $post->likes
            ->where('username', $username)
            ->count() > 0 ? true : false;
    }

    /*
     * Check if user has followed Musician */
    public function hasFollowed($post, $username)
    {
        return Follow::where('followed', $post->username)
            ->where('username', $username)
            ->exists();
    }

    /*
     * Check if user has muted posts from Musician */
    public function hasMuted($post, $username)
    {
        return Follow::where('followed', $post->username)
            ->where('username', $username)
            ->first()
            ?->muted["posts"];
    }
}

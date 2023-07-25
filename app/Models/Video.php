<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $dates = ['released'];

    /*
     * Accesors.
     */

    protected function getVideoAttribute($value)
    {
        return "storage/" . $value;
    }

    protected function getThumbnailAttribute($value)
    {
        return preg_match("/http/", $value) ? $value : "/storage/" . $value;
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
     * Relationships
     */

    public function user()
    {
        return $this->belongsTo(User::class, 'username', 'username');
    }

    public function album()
    {
        return $this->belongsTo(VideoAlbum::class, 'video_album_id');
    }

    public function likes()
    {
        return $this->hasMany(VideoLike::class);
    }

    public function comments()
    {
        return $this->hasMany(VideoComment::class);
    }

    public function bought()
    {
        return $this->hasMany(BoughtVideo::class);
    }

    public function cart()
    {
        return $this->hasMany(CartVideo::class);
    }

    /*
     *    Custom Functions
     */

    // Check if user has liked video
    public function hasLiked($username)
    {
        return $this->likes
            ->where('username', $username)
            ->count() > 0 ? true : false;
    }

    // Check if video in cart
    public function inCart($username)
    {
        return $this->cart
            ->where('username', $username)
            ->count() > 0 ? true : false;
    }

    // Check if user has bought video
    public function hasBoughtVideo($username)
    {
        return $this->bought
            ->where('username', $username)
            ->count() > 0 ? true : false;
    }
}

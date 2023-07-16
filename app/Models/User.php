<?php

namespace App\Models;

use Carbon\Carbon;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'email_verified_at',
        'password',
        'remember_token',
        'phone',
        'gender',
        'account_type',
        'account_type_2',
        'avatar',
        'backdrop',
        'bio',
        'dob',
        'location',
        'withdrawal',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /*
     * Accesors.
     */

	 protected function getAvatarAttribute($value)
	 {
		return preg_match("/http/", $value) ? $value : "/storage/" . $value;
	 }

    protected function getBackdropAttribute($value)
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

    public function audios()
    {
        return $this->hasMany(Audio::class, 'username', 'username');
    }

    public function audioAlbums()
    {
        return $this->hasMany(AudioAlbum::class, 'username', 'username');
    }

    public function audioComments()
    {
        return $this->hasMany(AudioComment::class, 'username', 'username');
    }

    public function audioCommentLikes()
    {
        return $this->hasMany(AudioCommentLike::class, 'username', 'username');
    }

    public function audioLikes()
    {
        return $this->hasMany(AudioLike::class, 'username', 'username');
    }

    public function boughtAudios()
    {
        return $this->hasMany(BoughtAudio::class, 'username', 'username');
    }

    public function boughtVideos()
    {
        return $this->hasMany(BoughtVideo::class, 'username', 'username');
    }

    public function cartAudios()
    {
        return $this->hasMany(CartAudio::class, 'username', 'username');
    }

    public function cartVideos()
    {
        return $this->hasMany(CartVideo::class, 'username', 'username');
    }

    public function chats()
    {
        return $this->hasMany(Chat::class, 'username', 'username');
    }

    public function decos()
    {
        return $this->hasMany(Deco::class, 'username', 'username');
    }

    public function follows()
    {
        return $this->hasMany(Follow::class, 'username', 'username');
    }

    public function karaokes()
    {
        return $this->hasMany(Karaoke::class, 'username', 'username');
    }

    public function karaokeAudios()
    {
        return $this->hasMany(KaraokeAudio::class, 'username', 'username');
    }

    public function karaokeComment()
    {
        return $this->hasMany(KaraokeComment::class, 'username', 'username');
    }

    public function karaokeCommentLikes()
    {
        return $this->hasMany(KaraokeCommentLike::class, 'username', 'username');
    }

    public function karaokeLikes()
    {
        return $this->hasMany(KaraokeLike::class, 'username', 'username');
    }

    public function kopokopos()
    {
        return $this->hasMany(Kopokopo::class, 'username', 'username');
    }

    public function kopokopoRecipients()
    {
        return $this->hasMany(KopokopoRecipient::class, 'username', 'username');
    }

    public function polls()
    {
        return $this->hasMany(Poll::class, 'username', 'username');
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'username', 'username');
    }

    public function postComments()
    {
        return $this->hasMany(PostComment::class, 'username', 'username');
    }

    public function postCommentLikes()
    {
        return $this->hasMany(PostCommentLike::class, 'username', 'username');
    }

    public function postLikes()
    {
        return $this->hasMany(PostLike::class, 'username', 'username');
    }

    public function referrals()
    {
        return $this->hasMany(Referral::class, 'username', 'username');
    }

    public function savedKaraokes()
    {
        return $this->hasMany(SavedKaraoke::class, 'username', 'username');
    }

    public function searches()
    {
        return $this->hasMany(Search::class, 'username', 'username');
    }

    public function songPayouts()
    {
        return $this->hasMany(SongPayout::class, 'username', 'username');
    }

    public function stories()
    {
        return $this->hasMany(Story::class, 'username', 'username');
    }

    public function videos()
    {
        return $this->hasMany(Video::class, 'username', 'username');
    }

    public function videoAlbums()
    {
        return $this->hasMany(VideoAlbum::class, 'username', 'username');
    }

    public function videoComments()
    {
        return $this->hasMany(VideoComment::class, 'username', 'username');
    }

    public function videoCommentLikes()
    {
        return $this->hasMany(VideoCommentLike::class, 'username', 'username');
    }

    public function videoLikes()
    {
        return $this->hasMany(VideoLike::class, 'username', 'username');
    }

    /*
     *    Custom Functions
     */

    /*
	* Check if user has followed User */
    public function hasFollowed($username)
    {
        return Follow::where('username', $username)
            ->where('followed', $this->username)
            ->count() > 0 ? true : false;
    }

    /*
	* Get user's fans */
    public function fans()
    {
        return Follow::where('followed', $this->username)->count() - 1;
    }

    /*
	* Check if auth user has bought user's video */
    public function hasBoughtVideo($username)
    {
        return BoughtVideo::where('username', $username)
            ->where('artist', $this->username)
            ->count();
    }

    /*
	 * Check if auth user has bought user's audio */
    public function hasBoughtAudio($username)
    {
        return BoughtAudio::where('username', $username)
            ->where('artist', $this->username)
            ->count();
    }

    /*
	* Check if user has bought atleast 1 song */
    public function hasBought1($username)
    {
        $hasBoughtVideo = $this->hasBoughtVideo($username);
        $hasBoughtAudio = $this->hasBoughtAudio($username);

        return $hasBoughtVideo + $hasBoughtAudio > 0 ? true : false;
    }

    /*
	* Get balance */
    public function balance()
    {
        // Get Cost of Bought Videos at each price
        $totalVideos = $this->boughtVideos->count() * 20;
        $totalAudios = $this->boughtAudios->count() * 10;

        // Get Total Cash paid
        $kopokopo = $this->kopokopos->sum('amount');

        return $kopokopo - ($totalVideos + $totalAudios);
    }
}

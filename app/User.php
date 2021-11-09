<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'username', 'email', 'email_verified_at', 'password', 'remember_token', 'phone', 'gender', 'account_type', 'account_type_2', 'pp', 'pb', 'bio', 'dob', 'location', 'withdrawal',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts()
    {
        return $this->hasMany('App\Posts', 'username', 'username');
    }

    public function decos()
    {
        return $this->hasMany('App\Decos', 'username', 'username');
    }

    public function follows()
    {
        return $this->hasMany('App\Follows', 'username', 'username');
    }

	public function videos()
	{
		return $this->hasMany('App\Videos', 'username', 'username');
	}

	public function videoAlbums()
	{
		return $this->hasMany('App\VideoAlbums', 'username', 'username');
	}
}

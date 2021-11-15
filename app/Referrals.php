<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Referrals extends Model
{
    public function boughtVideos()
	{
		return $this->hasMany('App\BoughtVideos', 'username', 'referee');
	} 

    public function boughtAudios()
	{
		return $this->hasMany('App\BoughtAudios', 'username', 'referee');
	} 
}

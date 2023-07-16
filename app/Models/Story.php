<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
	protected $casts = [
		"media" => "array"
	];
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

    public function seen()
    {
        return $this->hasMany(SeenStory::class);
    }

    /*
     * Custom functions
     */

    public function hasSeen($username)
    {
        return $this->seen
            ->where("username", $username)
            ->count() > 0 ? true : false;
    }
}

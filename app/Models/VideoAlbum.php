<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class VideoAlbum extends Model
{
	protected $dates = ['released'];
	
    /*
     * Accesors.
     */

	 protected function getCoverAttribute($value)
	 {
		return $value ? "/storage/" . $value : $value;
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

    public function videos()
    {
        return $this->hasMany(Video::class);
    }
}

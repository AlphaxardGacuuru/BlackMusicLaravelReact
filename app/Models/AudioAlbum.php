<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class AudioAlbum extends Model
{
	protected $dates = ['released'];

    /**
     * Accesors.
     *
     */
    protected function getCoverAttribute($value)
    {
        return "/storage/" . $value;
    }

    protected function getThumbnailAttribute($value)
    {
        return "/storage/" . $value;
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

    public function audios()
    {
        return $this->hasMany(Audio::class);
    }
}

<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    /*
     * Accesors.
     */

	 protected function getCoverAttribute($value)
	 {
		return $value ? "/storage/" . $value : $value;
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
}

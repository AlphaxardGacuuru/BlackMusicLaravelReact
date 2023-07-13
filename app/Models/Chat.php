<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    /**
     * Accesors.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function media(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? "/storage/" . $value : $value,
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'username', 'username');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoCommentLike extends Model
{
	public function comment()
	{
		return $this->belongsTo(VideoComment::class);
	}
}

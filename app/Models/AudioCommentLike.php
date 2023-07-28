<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AudioCommentLike extends Model
{
    public function comment()
    {
        return $this->belongsTo(AudioComment::class, "audio_comment_id");
    }
}

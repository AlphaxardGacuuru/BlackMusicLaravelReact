<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SavedKaraokeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // Check if user is logged in
        $username = auth('sanctum')->user()
        ? auth('sanctum')->user()->username
        : '@guest';

		 return [
                "id" => $this->karaoke->id,
                "karaoke" => $this->karaoke->karaoke,
                "audioId" => $this->karaoke->audio_id,
                "audioName" => $this->karaoke->audio->name,
                "audioThumbnail" => $this->karaoke->audio->thumbnail,
                "name" => $this->karaoke->user->name,
                "username" => $this->karaoke->user->username,
                "avatar" => $this->karaoke->user->avatar,
                "decos" => $this->karaoke->user->decos->count(),
                "description" => $this->karaoke->description,
                "hasLiked" => $this->karaoke->hasLiked($username),
                "hasSaved" => $this->karaoke->hasSaved($username),
                "likes" => $this->karaoke->likes->count(),
                "comments" => $this->karaoke->comments->count(),
                "createdAt" => $this->karaoke->created_at,
		 ];
    }
}

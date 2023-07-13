<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class KaraokeResource extends JsonResource
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
            "id" => $this->id,
            "karaoke" => $this->karaoke,
            "audioId" => $this->audio_id,
            "audioName" => $this->audio->name,
            "audioThumbnail" => $this->audio->thumbnail,
            "name" => $this->user->name,
            "username" => $this->user->username,
            "avatar" => $this->user->avatar,
            "decos" => $this->user->decos->count(),
            "description" => $this->description,
            "hasLiked" => $this->hasLiked($username),
            "hasSaved" => $this->hasSaved($username),
            "likes" => $this->likes->count(),
            "comments" => $this->comments->count(),
            "created_at" => $this->created_at,
        ];
    }
}

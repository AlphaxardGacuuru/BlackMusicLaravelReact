<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StoryResource extends JsonResource
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
            "name" => $this->user->name,
            "username" => $this->username,
            "avatar" => $this->user->avatar,
            "media" => $this->media,
            "text" => $this->text,
            "hasMuted" => filter_var($this->muted, FILTER_VALIDATE_BOOLEAN),
            "hasSeen" => $this->hasSeen($username),
        ];
    }
}

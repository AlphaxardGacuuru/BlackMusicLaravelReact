<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class KaraokeAudioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "audioId" => $this->audio_id,
            "username" => $this->username,
            "name" => $this->audio->name,
            "thumbnail" => $this->audio->thumbnail,
            "createdAt" => $this->created_at,
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartAudioResource extends JsonResource
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
            "cartId" => $this->id,
            "id" => $this->audio_id,
            "audio" => $this->audio->audio,
            "name" => $this->audio->name,
            "artistName" => $this->audio->user->name,
            "username" => $this->audio->username,
            "avatar" => $this->audio->user->avatar,
            "artistDecos" => $this->audio->user->decos->count(),
            "ft" => $this->audio->ft,
            "audioAlbumId" => $this->audio->audio_album_id,
            "album" => $this->audio->album->name,
            "genre" => $this->audio->genre,
            "thumbnail" => $this->audio->thumbnail,
            "description" => $this->audio->description,
            "released" => $this->audio->released,
            "hasLiked" => $this->audio->hasLiked($username),
            "likes" => $this->audio->likes->count(),
            "comments" => $this->audio->comments->count(),
            "inCart" => $this->audio->inCart($username),
            "hasBoughtAudio" => $this->audio->hasBoughtAudio($username),
            "hasBought1" => $this->audio->user->hasBought1($username),
            "hasFollowed" => $this->audio->user->hasFollowed($username),
            "downloads" => $this->audio->bought->count(),
            "createdAt" => $this->audio->created_at,
        ];
    }
}

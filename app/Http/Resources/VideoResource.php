<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
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
            "video" => $this->video,
            "name" => $this->name,
            "artistName" => $this->user->name,
            "username" => $this->username,
            "avatar" => $this->user->avatar,
            "artistDecos" => $this->user->decos->count(),
            "ft" => $this->ft,
            "videoAlbumId" => $this->video_album_id,
            "album" => $this->album->name,
            "genre" => $this->genre,
            "thumbnail" => $this->thumbnail,
            "description" => $this->description,
            "released" => $this->released,
            "hasLiked" => $this->hasLiked($username),
            "likes" => $this->likes->count(),
            "comments" => $this->comments->count(),
            "inCart" => $this->inCart($username),
            "hasBoughtVideo" => $this->hasBoughtVideo($username),
            "hasBought1" => $this->user->hasBought1($username),
            "hasFollowed" => $this->user->hasFollowed($username),
            "downloads" => $this->bought->count(),
            "createdAt" => $this->created_at,
        ];
    }
}

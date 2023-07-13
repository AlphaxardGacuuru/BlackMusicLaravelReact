<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartVideoResource extends JsonResource
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
                "id" => $this->video_id,
                "video" => $this->video->video,
                "name" => $this->video->name,
                "artistName" => $this->video->user->name,
                "username" => $this->video->username,
                "avatar" => $this->video->user->avatar,
                "artistDecos" => $this->video->user->decos->count(),
                "ft" => $this->video->ft,
                "videoAlbumId" => $this->video->video_album_id,
                "album" => $this->video->album->name,
                "genre" => $this->video->genre,
                "thumbnail" => $this->video->thumbnail,
                "description" => $this->video->description,
                "released" => $this->video->released,
                "hasLiked" => $this->video->hasLiked($username),
                "likes" => $this->video->likes->count(),
                "comments" => $this->video->comments->count(),
                "inCart" => $this->video->inCart($username),
                "hasBoughtVideo" => $this->video->hasBoughtVideo($username),
                "hasBought1" => $this->video->user->hasBought1($username),
                "hasFollowed" => $this->video->user->hasFollowed($username),
                "downloads" => $this->video->bought->count(),
                "createdAt" => $this->video->created_at,
		];
    }
}

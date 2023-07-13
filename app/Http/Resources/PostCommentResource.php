<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostCommentResource extends JsonResource
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
            "post_id" => $this->post_id,
            "name" => $this->user->name,
            "username" => $this->user->username,
            "decos" => $this->user->decos->count(),
            "avatar" => $this->user->avatar,
            "text" => $this->text,
            "likes" => $this->likes->count(),
            "hasLiked" => $this->hasLiked($username),
            "created_at" => $this->created_at,
        ];
    }
}

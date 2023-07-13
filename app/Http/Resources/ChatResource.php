<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
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
            "name" => $this->user->name,
            "username" => $this->user->username,
            "to" => $this->to,
            "avatar" => $this->user->avatar,
            "decos" => $this->user->decos->count(),
            "text" => $this->text,
            "media" => $this->media,
            "createdAt" => $this->created_at,
        ];
    }
}

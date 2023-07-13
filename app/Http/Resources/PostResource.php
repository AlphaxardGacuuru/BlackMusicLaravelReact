<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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

        // Get votes of each parameter as a percentage
        $percentage1 = $this->percentage($this, $this->parameter_1);
        $percentage2 = $this->percentage($this, $this->parameter_2);
        $percentage3 = $this->percentage($this, $this->parameter_3);
        $percentage4 = $this->percentage($this, $this->parameter_4);
        $percentage5 = $this->percentage($this, $this->parameter_5);

        $pollsPercentages = [
            $this->parameter_1 => $percentage1,
            $this->parameter_2 => $percentage2,
            $this->parameter_3 => $percentage3,
            $this->parameter_4 => $percentage4,
            $this->parameter_5 => $percentage5,
        ];

        // Get parameter with the most votes
        $winner = array_keys($pollsPercentages, max($pollsPercentages));

        $winner = count($winner) > 1 ? "" : $winner[0];

        return [
            "id" => $this->id,
            "name" => $this->user->name,
            "username" => $this->user->username,
            "avatar" => $this->user->avatar,
            "decos" => $this->user->decos->count(),
            "text" => $this->text,
            "media" => $this->media,
            "parameter_1" => $this->parameter_1,
            "parameter_2" => $this->parameter_2,
            "parameter_3" => $this->parameter_3,
            "parameter_4" => $this->parameter_4,
            "parameter_5" => $this->parameter_5,
            "hasVoted1" => $this->hasVoted($this, $username, $this->parameter_1),
            "hasVoted2" => $this->hasVoted($this, $username, $this->parameter_2),
            "hasVoted3" => $this->hasVoted($this, $username, $this->parameter_3),
            "hasVoted4" => $this->hasVoted($this, $username, $this->parameter_4),
            "hasVoted5" => $this->hasVoted($this, $username, $this->parameter_5),
            "percentage1" => $percentage1,
            "percentage2" => $percentage2,
            "percentage3" => $percentage3,
            "percentage4" => $percentage4,
            "percentage5" => $percentage5,
            "winner" => $winner,
            "totalVotes" => $this->polls->count(),
            "isWithin24Hrs" => $this->isWithin24Hrs(),
            "hasMuted" => filter_var($this->hasMuted($this, $username), FILTER_VALIDATE_BOOLEAN),
            "hasFollowed" => $this->hasFollowed($this, $username),
            "hasLiked" => $this->hasLiked($this, $username),
            "hasEdited" => filter_var($this->has_edited, FILTER_VALIDATE_BOOLEAN),
            "likes" => $this->likes->count(),
            "comments" => $this->comments->count(),
            "updatedAt" => $this->updated_at,
            "createdAt" => $this->created_at,
        ];
    }
}

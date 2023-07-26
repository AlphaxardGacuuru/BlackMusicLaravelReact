<?php

namespace App\Http\Services;

use App\Http\Resources\StoryResource;
use App\Models\Follow;
use App\Models\SeenStory;
use App\Models\Story;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class StoryService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get Posts if user has followed musician and is not muted
        $getStories = Story::select("stories.*", "follows.muted->stories as muted", "follows.blocked")
            ->join("follows", function ($join) {
                $join->on("follows.followed", "=", "stories.username")
                    ->where("follows.username", "=", "@blackmusic");
            })
            ->where("follows.muted->stories", false)
            ->orderBy("stories.id", "DESC")
            ->paginate(10);

        return StoryResource::collection($getStories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($request)
    {
        // Remove outer quotes
        $stringifiedMedia = explode(",", $request->input("media"));

        $arrayAndJsonMedia = [];

        foreach ($stringifiedMedia as $item) {
            $jsonMediaItem = json_decode($item);
            array_push($arrayAndJsonMedia, $jsonMediaItem);
        }

        $story = new Story;
        $story->username = $this->username;
        $story->media = $arrayAndJsonMedia;
        $story->text = $request->input("text");
        $saved = $story->save();

        return [$saved, "Story posted", $story];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $getStory = Story::find($id);

        return new StoryResource($getStory);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $story = Story::find($id);
        // Delete media
        foreach ($story->media as $media) {
            Storage::delete('public/' . $media["image"]);
        }

        $deleted = $story->delete();

        return [$deleted, "Story deleted"];
    }

    /*
     * Seen */
    public function seen($id)
    {
        $seenStory = new SeenStory;
        $seenStory->story_id = $id;
        $seenStory->username = $this->username;
        $seenStory->seen_at = Carbon::now();
        $saved = $seenStory->save();

        return [$saved, "Story seen", $seenStory];
    }

    /*
     * Mute */
    public function mute($username)
    {
        // Get follow
        $follow = Follow::where("followed", $username)
            ->where("username", $this->username)
            ->first();

        // Check if Stories are muted
        if ($follow->muted["stories"]) {
            $muted = $follow->muted;
            $muted["stories"] = false;
            $follow->muted = $muted;

            $message = "Stories from " . $username . " unmuted";
        } else {
            $muted = $follow->muted;
            $muted["stories"] = true;
            $follow->muted = $muted;

            $message = "Stories from " . $username . " muted";
        }

        $saved = $follow->save();

        return [$saved, $message];
    }
}

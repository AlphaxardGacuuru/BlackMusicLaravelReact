<?php

namespace App\Listeners;

use App\Events\PostCommentLikedEvent;
use App\Notifications\PostCommentLikedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class PostCommentLikedListener implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\PostCommentLikedEvent  $event
     * @return void
     */
    public function handle(PostCommentLikedEvent $event)
    {
        if ($event->comment->username != auth('sanctum')->user()->username) {
            $event->comment->user->notify(new PostCommentLikedNotification($event->comment, $event->post));
        }
    }
}

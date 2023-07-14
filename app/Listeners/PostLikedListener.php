<?php

namespace App\Listeners;

use App\Events\PostLikedEvent;
use App\Notifications\PostLikedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class PostLikedListener implements ShouldQueue
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
     * @param  \App\Events\PostLikedEvent  $event
     * @return void
     */
    public function handle(PostLikedEvent $event)
    {
		// Send Notification
        if ($event->post->username != auth('sanctum')->user()->username) {
            $event->post->user->notify(new PostLikedNotification($event->post));
        }
    }
}

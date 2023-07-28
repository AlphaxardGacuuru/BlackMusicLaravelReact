<?php

namespace App\Listeners;

use App\Events\VideoCommentLikedEvent;
use App\Notifications\VideoCommentLikedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class VideoCommentLikedListener implements ShouldQueue
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
     * @param  \App\Events\VideoCommentLikedEvent  $event
     * @return void
     */
    public function handle(VideoCommentLikedEvent $event)
    {
        $event
            ->comment
            ->user
            ->notify(new VideoCommentLikedNotification($event->comment, $event->username));
    }
}

<?php

namespace App\Listeners;

use App\Events\VideoCommentedEvent;
use App\Notifications\VideoCommentedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class VideoCommentedListener implements ShouldQueue
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
     * @param  \App\Events\VideoCommentedEvent  $event
     * @return void
     */
    public function handle(VideoCommentedEvent $event)
    {
        $event
            ->video
            ->user
            ->notify(new VideoCommentedNotification($event->video, $event->username));
    }
}

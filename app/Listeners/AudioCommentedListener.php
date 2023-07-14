<?php

namespace App\Listeners;

use App\Events\AudioCommentedEvent;
use App\Notifications\AudioCommentedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AudioCommentedListener implements ShouldQueue
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
     * @param  \App\Events\AudioCommentedEvent  $event
     * @return void
     */
    public function handle(AudioCommentedEvent $event)
    {
        if ($event->audio->user->username != auth('sanctum')->user()->username) {
            $event->audio->user->notify(new AudioCommentedNotification($event->audio));
        }
    }
}

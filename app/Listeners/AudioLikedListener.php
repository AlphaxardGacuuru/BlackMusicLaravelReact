<?php

namespace App\Listeners;

use App\Events\AudioLikedEvent;
use App\Notifications\AudioLikedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class AudioLikedListener implements ShouldQueue
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
     * @param  \App\Events\AudioLikedEvent  $event
     * @return void
     */
    public function handle(AudioLikedEvent $event)
    {
        $event
            ->audio
            ->user
            ->notify(new AudioLikedNotification($event->audio, $event->username));
    }
}

<?php

namespace App\Listeners;

use App\Events\AudioLikedEvent;
use App\Notifications\AudioLikedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

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
        if ($event->audio->username != auth("sanctum")->user()->username) {
			$event->audio->user->notify(new AudioLikedNotification($event->audio));
		}
    }
}

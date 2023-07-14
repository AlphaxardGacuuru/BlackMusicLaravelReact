<?php

namespace App\Listeners;

use App\Events\StoryCreatedEvent;
use App\Notifications\StoryCreatedNotification;

class StoryCreatedListener
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
     * @param  \App\Events\StoryCreatedEvent  $event
     * @return void
     */
    public function handle(StoryCreatedEvent $event)
    {
        new StoryCreatedNotification($event->story);
    }
}

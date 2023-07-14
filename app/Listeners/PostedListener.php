<?php

namespace App\Listeners;

use App\Events\PostedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class PostedListener implements ShouldQueue
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
     * @param  \App\Events\PostedEvent  $event
     * @return void
     */
    public function handle(PostedEvent $event)
    {
        //
    }
}

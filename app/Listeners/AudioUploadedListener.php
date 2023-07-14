<?php

namespace App\Listeners;

use App\Events\AudioUploadedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class AudioUploadedListener implements ShouldQueue
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
     * @param  \App\Events\AudioUploadedEvent  $event
     * @return void
     */
    public function handle(AudioUploadedEvent $event)
    {
        //
    }
}

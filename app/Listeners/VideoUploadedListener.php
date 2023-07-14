<?php

namespace App\Listeners;

use App\Events\VideoUploadedEvent;
use App\Jobs\ProcessVideoJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class VideoUploadedListener implements ShouldQueue
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
     * @param  \App\Events\VideoUploadedEvent  $event
     * @return void
     */
    public function handle(VideoUploadedEvent $event)
    {
        ProcessVideoJob::dispatch($event->video);
    }
}

<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;

class ProcessVideoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $video;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($video)
    {
        $this->video = $video;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $thumbnail = substr($this->video->video, 16);
        $thumbnail = substr($thumbnail, 0, -4);

        $video = substr($this->video->video, 9);

        FFMpeg::fromDisk('public')
            ->open($video)
            ->getFrameFromSeconds(10)
            ->export()
            ->toDisk('public')
            ->save("video-thumbnails/" . $thumbnail . ".jpg");
    }
}

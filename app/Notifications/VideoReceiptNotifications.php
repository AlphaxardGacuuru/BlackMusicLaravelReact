<?php

namespace App\Notifications;

use App\Mail\VideoReceipt;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VideoReceiptNotifications extends Notification
{
    use Queueable;

    protected $videos;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($videos)
    {
        $this->videos = $videos;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new VideoReceipt($this->videos))
            ->to($notifiable->email);
    }

    public function toDatabase()
    {
        $list = [];

        foreach ($this->videos as $video) {
            array_push($list, $video['name']);
        }

        // Check proper grammar
        if (count($this->videos) > 1) {
            $numberOfVideos = count($this->videos) . ' videos: ';
        } else {
            $numberOfVideos = count($this->videos) . ' video: ';
        }

        return [
            'from' => '@blackmusic',
            'message' => 'You bought ' . $numberOfVideos . implode(", ", $list),
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}

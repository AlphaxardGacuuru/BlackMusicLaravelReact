<?php

namespace App\Notifications;

use App\Mail\AudioReceipt;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AudioReceiptNotifications extends Notification
{
    use Queueable;

    protected $audios;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($audios)
    {
        $this->audios = $audios;
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
        return (new AudioReceipt($this->audios))
            ->to($notifiable->email);
    }

    public function toDatabase()
    {
		$list = [];

		foreach ($this->audios as $audio) {
			array_push($list, $audio['name']);
		}

        // Check proper grammar
        if (count($this->audios) > 1) {
            $numberOfAudios = count($this->audios) . ' audios: ';
        } else {
            $numberOfAudios = count($this->audios) . ' audio: ';
        }

        return [
			'url' => '/library',
            'from' => '@blackmusic',
            'message' => 'You bought ' . $numberOfAudios . implode(", ", $list),
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

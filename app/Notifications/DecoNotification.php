<?php

namespace App\Notifications;

use App\Mail\DecoMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DecoNotification extends Notification implements ShouldBroadcast
{
    use Queueable;

    public $artist;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($artist)
    {
        $this->artist = $artist;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'mail', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new DecoMail($notifiable->username, $this->artist))
            ->to($notifiable->email);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        // $artists = "";

        // foreach ($this->artists as $key => $value) {
        //     if ($key == 0) {
        //         $artists = $value;
        //     } elseif ($key == count($this->artists) - 1) {
        //         $artists = $artists . " & " . $value;
        //     } else {
        //         $artists = $artists . ", " . $value;
        //     }
        // }

        $message = "Congratulations! " . $this->artist . " decorated you.";

        return [
            'url' => '/profile/show/' . $this->artist,
            'from' => $this->artist,
            'message' => $message,
        ];
    }
}

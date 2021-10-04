@component('mail::message')
# Welcome to Black Music

The body of your message.

@component('mail::button', ['url' => ''], ['style' => 'border-radius: 0px'])
Button Text
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent

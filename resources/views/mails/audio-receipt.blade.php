@component('mail::message')
# Congratulations! You just purchased {{ count($audios) }} audios.

Thank you for supporting Kenyan artists, here's your receipt.

@component('mail::panel')
@foreach ($audios as $audio)
	{{ $audio['name'] }}<br>
	{{ $audio['username'], $audio['ft'] }}<br><br>
	@endforeach
@endcomponent

@component('mail::button', ['url' => 'https://music.black.co.ke/library'])
CHECK THEM OUT
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
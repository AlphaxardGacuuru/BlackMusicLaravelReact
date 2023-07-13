<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Follow;
use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
 */

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name(),
        'username' => '@' . $faker->unique()->firstName(),
        'email' => $faker->unique()->safeEmail(),
        'email_verified_at' => now(),
        'avatar' => 'avatars/male-avatar.png',
        'backdrop' => 'img/headphones.jpg',
        'phone' => $faker->phoneNumber(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'remember_token' => Str::random(10),
        'bio' => $faker->catchPhrase(),
    ];
});

/**
 * Add Black Music Account First
 *
 * @return static
 */
$factory->state(User::class, 'black', function (Faker $faker) {
    return [
        'name' => 'Black Music',
        'username' => '@blackmusic',
        'email' => 'al@black.co.ke',
        'email_verified_at' => now(),
        'account_type' => 'musician',
        'avatar' => 'avatars/male-avatar.png',
        'backdrop' => 'img/headphones.jpg',
        'phone' => '0700000000',
        'password' => Hash::make('0700000000'),
        'remember_token' => Str::random(10),
        'bio' => $faker->catchPhrase(),
    ];
});

/**
 * Add Alphaxard Account
 *
 * @return static
 */
$factory->state(User::class, 'al', function (Faker $faker) {
    return [
        'name' => 'Alphaxard Gacuuru',
        'username' => '@alphaxardG',
        'email' => 'alphaxardgacuuru47@gmail.com',
        'email_verified_at' => now(),
        'account_type' => 'normal',
        'avatar' => 'avatars/male-avatar.png',
        'backdrop' => 'img/headphones.jpg',
        'phone' => '0700364446',
        'password' => Hash::make('0700364446'),
        'remember_token' => Str::random(10),
        'bio' => $faker->catchPhrase(),
    ];
});

/**
 * Configure the model factory.
 *
 * @return $this
 */
$factory->afterCreating(User::class, function (User $user) {
    // Check if user is @blackmusic
    if ($user->username == '@blackmusic') {
        factory(Follow::class)
            ->create([
                'followed' => '@blackmusic',
                'username' => $user->username,
                'muted' => ["posts" => false, "stories" => false],
            ]);
    } elseif ($user->username == '@alphaxardG') {
        factory(Follow::class)
            ->create([
                'followed' => '@alphaxardG',
                'username' => $user->username,
                'muted' => ["posts" => false, "stories" => false],
            ]);
    } else {
        factory(Follow::class, 2)
            ->state(new Sequence(
                ['followed' => $user->username],
                ['followed' => '@blackmusic']
            ))
            ->create([
                'username' => $user->username,
                'muted' => ["posts" => false, "stories" => false],
            ]);
    }
});

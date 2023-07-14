<?php

use App\Models\Poll;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class PollSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create Post
        $post = factory(Post::class)->create([
            'media' => '',
            'parameter_1' => 'A',
            'parameter_2' => 'B',
            'parameter_3' => 'C',
            'parameter_4' => 'D',
            'parameter_5' => 'E',
            'created_at' => Carbon::now()->subHours(24),
        ]);

        // Add for each user
        $users = User::all();

        foreach ($users as $user) {
            factory(Poll::class)
                ->create([
                    'post_id' => $post->id,
                    'username' => $user->username,
                ]);
        }
    }
}

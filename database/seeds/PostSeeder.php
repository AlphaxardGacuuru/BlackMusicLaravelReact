<?php

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create one post for @blackmusic
        factory(Post::class)
            ->create(['username' => "@blackmusic"]);

        factory(Post::class, 10)->create();
    }
}

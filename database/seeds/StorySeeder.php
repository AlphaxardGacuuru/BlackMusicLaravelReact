<?php

use App\Models\Story;
use Illuminate\Database\Seeder;

class StorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create one post for @blackmusic
        factory(Story::class)
            ->create(["username" => "@blackmusic"]);

        factory(Story::class, 10)->create();
    }
}

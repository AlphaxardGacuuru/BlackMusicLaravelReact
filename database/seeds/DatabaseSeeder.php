<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            // Must be ran in this order since there are some dependancies
            UserSeeder::class,

            PostSeeder::class,
            PollSeeder::class,

            VideoAlbumSeeder::class,
            VideoSeeder::class,
            // BoughtVideoSeeder::class,

            AudioAlbumSeeder::class,
            AudioSeeder::class,
            // BoughtAudioSeeder::class,

            KaraokeSeeder::class,
			
            StorySeeder::class,
        ]);
    }
}

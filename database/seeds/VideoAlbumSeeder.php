<?php

use App\Models\VideoAlbum;
use Illuminate\Database\Seeder;

class VideoAlbumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(VideoAlbum::class)->create(['username' => '@blackmusic']);
		
        factory(VideoAlbum::class, 10)->create();
    }
}

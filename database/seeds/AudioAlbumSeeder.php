<?php

use App\Models\AudioAlbum;
use Illuminate\Database\Seeder;

class AudioAlbumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(AudioAlbum::class)->create(['username' => '@blackmusic']);
		
        factory(AudioAlbum::class, 10)->create();
    }
}

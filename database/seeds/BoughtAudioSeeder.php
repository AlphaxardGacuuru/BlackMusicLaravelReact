<?php

use App\Models\BoughtAudio;
use Illuminate\Database\Seeder;

class BoughtAudioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(BoughtAudio::class, 10)->create();
    }
}

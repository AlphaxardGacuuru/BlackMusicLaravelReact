<?php

use App\Models\BoughtVideo;
use Illuminate\Database\Seeder;

class BoughtVideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(BoughtVideo::class, 10)->create();
    }
}

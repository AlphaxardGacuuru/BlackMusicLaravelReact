<?php

use App\Models\Karaoke;
use Illuminate\Database\Seeder;

class KaraokeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Karaoke::class, 10)->create();
    }
}

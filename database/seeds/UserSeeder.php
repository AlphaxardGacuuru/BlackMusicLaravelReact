<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Check if @blackmusic exists
        $blackDoesntExist = User::where('username', '@blackmusic')
            ->doesntExist();

        // Check if @alphaxardG exists
        $alDoesntExist = User::where('username', '@alphaxardG')
            ->doesntExist();

        if ($blackDoesntExist) {
            factory(User::class, 1)
                ->states('black')
                // ->hasKopokopos(1)
                ->create();
        }

        if ($alDoesntExist) {
            factory(User::class, 1)
                ->states('al')
                // ->hasKopokopos(1)
                ->create();
        }

        // factory(User::class, 10)
            // ->state(new Sequence(
                // ['account_type' => 'normal'],
                // ['account_type' => 'musician']))
            // ->hasKopokopos(1)
            // ->create();
    }
}

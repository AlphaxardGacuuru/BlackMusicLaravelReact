<?php

use App\Models\Kopokopo;
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
                ->create()
                ->each(fn($user) => $user
                        ->kopokopos()
                        ->save(factory(Kopokopo::class)->make()));
        }

        if ($alDoesntExist) {
            factory(User::class, 1)
                ->states('al')
                ->create()
                ->each(fn($user) => $user
                        ->kopokopos()
                        ->save(factory(Kopokopo::class)->make()));
        }

        factory(User::class, 10)
            ->create()
            ->each(fn($user) => $user
                    ->kopokopos()
                    ->save(factory(Kopokopo::class)->make()));
    }
}

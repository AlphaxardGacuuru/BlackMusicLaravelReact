<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return Auth::user();
    }

    public function redirectToProvider($website)
    {
        return Socialite::driver($website)->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback($website)
    {
        $user = Socialite::driver($website)->stateless()->user();

        // OAuth Two Providers
        $token = $user->token;
        $refreshToken = $user->refreshToken; // not always provided
        $expiresIn = $user->expiresIn;

        $user = Socialite::driver('github')->userFromToken($token);

        $dbUser = User::where('email', $user->getEmail())->first();
        $usernameCheck = User::where('email', $user->getEmail())->first()->username;

        $createUser = new User;
        $createUser->email = $user->getEmail();
        $createUser->save();

        // $user->getName();
        // $user->getEmail();
        // $user->getAvatar();

        /* Check if user exists */
        /* Login if user is found in database */
        // if ($usernameCheck) {
        //     Auth::login($emailCheck);
        //     return redirect('posts');

        // } else {
        //     $try = "two";
        //     return view('auth.login')->with(['try' => $try, 'gotEmail' => $user->getEmail()]);

        // }
    }
}

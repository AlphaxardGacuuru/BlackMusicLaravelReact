<?php

namespace App\Http\Controllers;

use App\Decos;
use App\Follows;
use App\Posts;
use App\BoughtVideos;
use App\BoughtAudios;
use App\Kopokopo;
use Illuminate\Support\Facades\Auth;

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
        // Check if user is logged in
        if (Auth::check()) {
            // Get Cost of Bought Videos at each price
            $totalVideos = BoughtVideos::where('username', auth()->user()->username)->count() * 20;
            $totalAudios = BoughtAudios::where('username', auth()->user()->username)->count() * 10;
            $betterPhone = substr_replace(auth()->user()->phone, '+254', 0, -9);
			
            // Get Total Cash paid
            $kopokopo = Kopokopo::where('sender_phone_number', $betterPhone)->sum('amount');
            $balance = $kopokopo - ($totalVideos + $totalAudios);

            return [
				"id" => Auth::user()->id,
                "name" => Auth::user()->name,
                "username" => Auth::user()->username,
                "email" => Auth::user()->email,
                "phone" => Auth::user()->phone,
                "account_type" => Auth::user()->account_type,
                "pp" => preg_match("/http/", Auth::user()->pp) ? Auth::user()->pp : "/storage/" . Auth::user()->pp,
                "pb" => Auth::user()->pb,
                "bio" => Auth::user()->bio,
                "dob" => Auth::user()->dob,
				"withdrawal" => Auth::user()->withdrawal,
                "decos" => Decos::where('username', Auth::user()->username)->count(),
                "fans" => Follows::where('followed', Auth::user()->username)->count() - 1,
                "following" => Follows::where('followed', Auth::user()->username)->count(),
                "posts" => Posts::where('username', Auth::user()->username)->count(),
				"balance" => $balance,
                "created_at" => Auth::user()->created_at,
            ];
        }
    }
}

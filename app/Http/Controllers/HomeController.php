<?php

namespace App\Http\Controllers;

use App\Decos;
use App\Follows;
use App\Posts;
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
            return [
                "name" => Auth::user()->name,
                "username" => Auth::user()->username,
                "email" => Auth::user()->email,
                "phone" => Auth::user()->phone,
                "account_type" => Auth::user()->account_type,
                "pp" => Auth::user()->pp,
                "pb" => Auth::user()->pb,
                "bio" => Auth::user()->bio,
                "dob" => Auth::user()->dob,
                "decos" => Decos::where('username', Auth::user()->username)->count(),
                "fans" => Follows::where('followed', Auth::user()->username)->count() - 1,
                "following" => Follows::where('followed', Auth::user()->username)->count(),
                "posts" => Posts::where('username', Auth::user()->username)->count(),
                "created_at" => Auth::user()->created_at,
            ];
        }
    }
}

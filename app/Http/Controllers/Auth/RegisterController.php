<?php

namespace App\Http\Controllers\Auth;

use App\Follows;
use App\Http\Controllers\Controller;
use App\Mail\WelcomeMail;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
     */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'username' => [
                'required',
                'string',
                'startsWith:@',
                'min:2',
                'max:15',
                'unique:users',
                'regex:/^\S+$/',
            ],
            'phone' => [
                'required',
                'string',
                'startsWith:0',
                'min:10',
                'max:10',
                'unique:users',
            ],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        // Notify User
        Mail::to($data['email'])
            ->send(new WelcomeMail($data['username']));

        /* User should follow themselves */
        $follow = new Follows;
        $follow->followed = $data['username'];
        $follow->username = $data['username'];
        $follow->muted = "show";
        $follow->save();

        /* User should follow @blackmusic */
        $follow = new Follows;
        $follow->followed = '@blackmusic';
        $follow->username = $data['username'];
        $follow->muted = "show";
        $follow->save();

        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'username' => $data['username'],
            // 'remember_token' => $data['remember_token'],
            'phone' => $data['phone'],
            'pp' => $data['avatar'],
            'withdrawal' => '1000',
        ]);
    }
}
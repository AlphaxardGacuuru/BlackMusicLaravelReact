<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
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
            'name' => ['required', 'string', 'max:255'],
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
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users',
            ],
            'password' => [
                'required',
                'confirmed',
                Rules\Password::defaults(),
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
        DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data['name'],
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => Hash::make($data['phone']),
                'phone' => $data['phone'],
                'avatar' => $data['avatar'],
                'withdrawal' => '1000',
            ]);

            /* User should follow themselves */
            $follow = new Follow;
            $follow->followed = $data['username'];
            $follow->username = $data['username'];
            $follow->muted = ["posts" => false, "stories" => false];
            $follow->save();

            /* User should follow @blackmusic */
            $follow = new Follow;
            $follow->followed = '@blackmusic';
            $follow->username = $data['username'];
            $follow->muted = ["posts" => false, "stories" => false];
            $follow->save();

            event(new Registered($user));

            Auth::login($user, $remember = true);
        });

        // return response()->noContent();

        /*
         * Create Token */
        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return $user->createToken($data['device_name'])->plainTextToken;
    }
}

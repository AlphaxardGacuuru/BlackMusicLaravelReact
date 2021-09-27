<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
     */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    // Change identifier to phone
    public function username()
    {
        return 'phone';
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
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
        // OAuth Two Providers
        // $token = $user->token;
        // $refreshToken = $user->refreshToken; // not always provided
        // $expiresIn = $user->expiresIn;

        // $user = Socialite::driver($website)->userFromToken($token);
        $user = Socialite::driver($website)->user();

        echo $user->getName() . "<br>";
        echo $user->getEmail() . "<br>";
        echo $user->getAvatar() . "<br>";
        echo "<image src='" . $user->getAvatar() . "' />";

        $dbUser = User::where('email', $user->getEmail())->first();

        $createUser = new User;
        $createUser->email = $user->getEmail();
        // $createUser->save();

        /* Check if user exists */
        /* Login if user is found in database */
        // if (Auth::attempt(['email' => $user->email], true)) {
        //     // Authentication passed...
        //     return redirect()->intended();
        // } else {
		// 	return "didn't work";
		// }

        if ($dbUser->email) {
            Auth::login($dbUser->email, true);
            return redirect('/');

        } else {
            return redirect('/#/register');

        }
    }

    /*
     *
     * Register user
     */
    public function register(Request $request)
    {
        $fields = $request->validate([
            'username' => ['required', 'string', 'startsWith:@', 'min:2', 'max:15', 'unique:users'],
            'phone' => ['required', 'string', 'startsWith:07', 'min:10', 'max:10', 'unique:users'],
        ]);

        return User::create([
            'username' => $fields['username'],
            'phone' => $fields['phone'],
        ]);
    }

    /*
     *
     * Login User
     */
    // public function login(Request $request)
    // {
    //     $fields = $request->validate([
    //         'phone' => 'required|exists:users',
    //     ]);

    //     // Fetch User
    //     $user = User::where('phone', $fields['phone'])->first();

    //     $token = $user->createToken('normal')->plainTextToken;

    //     // Auth::login($user);

    //     $response = [
    //         'user' => auth()->user(),
    //         'token' => $token,
    //     ];

    //     return response($response, 201);
    // }

    public function logout(Request $request)
    {
        return Auth::logout();

        // return auth()->user()->tokens()->delete();
    }
}

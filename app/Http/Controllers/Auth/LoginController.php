<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

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
        $user = Socialite::driver($website)->stateless()->user();

        $emailCheck = User::where('email', $user->getEmail())->first();
        $usernameCheck = User::where('email', $user->getEmail())->first()->username;
        if ($usernameCheck) {
            /* Login if user is found in database */
            Auth::login($emailCheck);
            return redirect('posts');
        } else {
            $try = "two";
            return view('auth.login')->with(['try' => $try, 'gotEmail' => $user->getEmail()]);
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
		
	// 	// Auth::login($user);

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

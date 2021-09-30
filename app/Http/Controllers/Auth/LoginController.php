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
        $user = Socialite::driver($website)->user();

        if ($user->getName()) {
            $name = $user->getName();
        } else {
            $name = " ";
        }

        if ($user->getEmail()) {
            $email = $user->getEmail();
        } else {
            return redirect('/');
        }

        if ($user->getAvatar()) {
            $avatar = $user->getAvatar();
        } else {
            $avatar = "profile-pics/male_avatar.png";
        }

        // Get Database User
        $dbUser = User::where('email', $user->getEmail())->first();

        // Check if user exists
        if ($dbUser) {

            $currentUser = User::find($dbUser->id);

            Auth::login($currentUser, true);

            return redirect()->intended();

        } else {
            $name = $user->getName();
            $email = $user->getEmail();
            $avatar = $user->getAvatar();
            // Remove forward slashes
            $avatar = str_replace("/", " ", $avatar);

            return redirect('/#/register/' . $name . '/' . $email . '/' . $avatar);

        }
    }

    // Update Use on Login
    public function update(Request $request)
    {
        $user = User::find($request->input('id'));
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->pp = $request->input('avatar');
        $user->save();

        Auth::login($user, true);

        return redirect('/');
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
    }
}

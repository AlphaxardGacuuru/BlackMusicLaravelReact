<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
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

        // return Socialite::driver($website)->stateless()->redirect()->getTargetUrl();
    }

    /**
     * Obtain the user information from GitHub/Google/Twitter/Facebook.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback($website)
    {
        $user = Socialite::driver($website)->user();

        $name = $user->getName() ? $user->getName : " ";
        $email = $user->getEmail();
        $avatar = $user->getAvatar() ? $user->getAvatar() : "profile-pics/male-avatar.png";
        // Remove forward slashes
        $avatar = str_replace("/", " ", $avatar);

        // Get Database User
        $dbUser = User::where('email', $user->getEmail())->first();

        // Check if user exists
        if ($dbUser && $dbUser->username && $dbUser->phone) {
            $token = $user->createToken("device_name")->plainTextToken;

            return $token;
        } else {
            return redirect('/#/register/' . $name . '/' . $email . '/' . $avatar);
        }
    }

    // Update User on Login
    public function update(Request $request)
    {
        $this->validate($request, [
            'username' => [
                'required',
                'string',
                'startsWith:@',
                'min:2',
                'max:15',
                'regex:/^\S+$/',
            ],
            'phone' => [
                'required',
                'string',
                'startsWith:07',
                'min:10',
                'max:10',
            ],
        ]);

        $user = User::find($request->input('id'));
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->pp = $request->input('avatar');
        $user->username = $request->input('username');
        $user->phone = $request->input('phone');
        $user->save();

        $token = $user->createToken($request->device_name)->plainTextToken;

        return $token;

        return redirect('/');
    }

    public function logout(Request $request)
    {
        // Delete Current Access Token
        $hasLoggedOut = auth("sanctum")
            ->user()
            ->currentAccessToken()
            ->delete();

        if ($hasLoggedOut) {
            $message = "Logged Out";
        } else {
            $message = "Failed to log out";
        }

        return response(["message" => $message], 200);
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\WelcomeMail;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
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
        $dbUser = User::where('email', $user->getEmail());

        // Check if user exists
        if ($dbUser->exists()) {
            if ($dbUser->first()->username && $dbUser->first()->phone) {

                Auth::login($dbUser->first(), true);

                // Auth::loginUsingId($dbUser->first()->id, true);

                // Auth::attempt([
                //     'phone' => $dbUser->first()->phone,
                //     'password' => $dbUser->first()->phone
                // ], true);

                return redirect()->intended();
            } else {
                $name = $user->getName();
                $email = $user->getEmail();
                $avatar = $user->getAvatar();
                // Remove forward slashes
                $avatar = str_replace("/", " ", $avatar);

                return redirect('/#/register/' . $name . '/' . $email . '/' . $avatar);
            }
        } else {
            $name = $user->getName();
            $email = $user->getEmail();
            $avatar = $user->getAvatar();
            // Remove forward slashes
            $avatar = str_replace("/", " ", $avatar);

            return redirect('/#/register/' . $name . '/' . $email . '/' . $avatar);
        }
    }

    // Update User on Login
    public function update(Request $request)
    {
        $this->validate($request, [
            'username' => ['required', 'string', 'startsWith:@', 'min:2', 'max:15', 'regex:/^\S+$/'],
            'phone' => ['required', 'string', 'startsWith:07', 'min:10', 'max:10'],
        ]);

        $user = User::find($request->input('id'));
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->pp = $request->input('avatar');
        $user->username = $request->input('username');
        $user->phone = $request->input('phone');
        $user->save();

        // Notify User
        Mail::to($request->input('email'))
            ->send(new WelcomeMail($request->input('username')));

        Auth::login($user, true);

        return redirect('/');
    }

    public function logout(Request $request)
    {
        return Auth::logout();
    }
}

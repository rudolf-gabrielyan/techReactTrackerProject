<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use DB;
use App\Quotation;
use Validator;
use App\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;
use Illuminate\Auth\Authenticatable;
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
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {

        $credentials = $request->json()->all();
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json('Username or Password is incorrect', 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        $user = JWTAuth::user();

        $user->paddleInfo = $this->getPaddleData($user->id);
        $user->accountInformation = $this->getAccountInformation($user->id);
            
        return response()->json( compact('token','user'));
    }

    
    public function getAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        $user->paddleInfo = $this->getPaddleData($user->id);
        $user->accountInformation = $this->getAccountInformation($user->id);
        
        return response()->json(compact('user'));
    }

    
    public function getPaddleData($user_id) {
        $paddle = DB::table('paddle_infos')->where('user_id', $user_id)->get()->first();
        return $paddle;
    }

    public function getAccountInformation($user_id) {
        $account_information = DB::table('account_information')->where('user_id', $user_id)->get()->first();
        return $account_information;
    }

    public function logout() 
    {
        config([
            'jwt.blacklist_enabled' => true
        ]);
        \Cookie::forget('token');
        auth()->logout();
        JWTAuth::invalidate(JWTAuth::parseToken());
        return response()->json(['message' => 'Successfully logged out']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Hash, Cookie;
use Laravel\Passport\Passport;

class AuthController extends Controller
{
    public function register (Request $request) 
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails())
        {
            return response()->json(['errors'=>$validator->errors()->all()], 422);
        }

        $request['password']=Hash::make($request['password']);
        $user = User::create($request->toArray());

        $token = $user->createToken('Laravel Password Grant Client')->accessToken;
        
        try {
            $this->setCookie($token);
            return response()->json(['message' => __('auth.signed_up')], 200);
        } catch(\Exception $e)
        {
            return response()->json(['errors' => $e->getMessage(), $e->getCode()]);
        }
    }

    public function login (Request $request) 
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json(['errors'=>$validator->errors()->all()], 422);
        }
        $user = User::where('email', $request->email)->first();

        if ($user) {

            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('Laravel Password Grant Client')->accessToken;
                
                try {
                    $this->setCookie($token);
                    return response()->json(['message' => __('auth.logged_in')], 200);
                } catch(\Exception $e)
                {
                    return response()->json(['errors' => $e->getMessage(), $e->getCode()]);
                }
            } else {
                return response()->json(['errors' => [__('auth.errors.login')]], 422);
            }

        } else {
            return response()->json(['errors' => [__('auth.errors.login')]], 422);
        }

    }

    public function logout (Request $request) {

        $token = $request->user()->token();
        $token->revoke();

        return response()->json(['success' => [__('auth.logout')]], 200);
    }

    private function setCookie($value)
    {
            $name = Passport::cookie();
            $minutes = config('session.lifetime');
            Cookie::queue($name, $value, $minutes);
    }
}

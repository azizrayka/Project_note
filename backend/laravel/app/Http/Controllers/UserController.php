<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function Signup(Request $request)
    {
        return User::create($request->all());
    }

    public function Login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if(!$user){
            return response()->json(['message' => 'User not found'], 404);
        }
        if(!Hash::check($request->password, $user->password)){
            return response()->json(['message' => 'Invalid password'], 401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['access_token' => $token , 'user_id'=>$user->id , 'user_name' => $user->name], 200);
    }

    public function Logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out'], 200);
    }
}

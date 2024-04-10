<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
// Validation
use App\Http\Helpers\Validations\UserValidation;
//Model
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    // Login 
    public function login(){

        $credentials = request(['email', 'password']);

        $token = JWTAuth::attempt($credentials);

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'token' => $token,
            'user' => $this->currentUser(),
        ], Response::HTTP_CREATED);

    }

    // Register 
    public function register(Request $request){
        // validate data and throw erros
        $validation = new UserValidation($request);
        $data = $validation->register();
        // Make  new user
        $data['role']='user';
        $user = User::create($data);

        $credentials = request(['email', 'password']);
        return response()->json([
            'message' => 'User and profile created',
            'token' => JWTAuth::attempt($credentials),
            'user' => $user,
        ], Response::HTTP_CREATED);

    }
    // Register 
    public function registerAdmin(Request $request){
        // validate data and throw erros
        $validation = new UserValidation($request);
        $data = $validation->register();
        // Make  new user
        $data['role']='admin';
        $user = User::create($data);


    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
        ],Response::HTTP_CREATED);
    }
}

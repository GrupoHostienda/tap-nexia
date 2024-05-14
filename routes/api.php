<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// Controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\BackgroundController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('register/user', [AuthController::class, 'register']);
Route::post('register/admin', [AuthController::class, 'registerAdmin']);

Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => ['jwt']], function () {
    // LINK
    Route::get('links',[LinkController::class,'show']);
    // BACKGROUND
    Route::get('backgrounds',[BackgroundController::class,'show']);
    // USER
    Route::get('user',[UserController::class,'getUser']);
    Route::post('user/update',[UserController::class,'update']);
    Route::get('user/links',[UserController::class,'links']);
    Route::post('user/link/store',[UserController::class,'addLink']);
    Route::post('user/link/update/{link}',[UserController::class,'editLink']);
    Route::delete('user/link/delete/{link}',[UserController::class,'deleteLink']);
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// Controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LinkController;

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
});

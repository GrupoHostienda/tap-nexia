<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ExampleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserSocialItemController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::prefix('/items')->middleware('auth')->group(function () {
    Route::get('/', [ItemController::class, 'index'])->name('items');
    Route::post('/', [ItemController::class, 'store'])->name('items.store');
    Route::post('update', [ItemController::class, 'update'])->name('items.update');
    Route::delete('/deleteSelected', [ItemController::class, 'deleteSelected'])->name('items.deleteSelected');
    Route::delete('/{example}', [ItemController::class, 'destroy'])->name('items.destroy');
    // Route::get('/create', [ItemController::class, 'create'])->name('items.create');
    // Route::get('/{example}', [ItemController::class, 'show'])->name('items.show');
    // Route::get('/{example}/edit', [ItemController::class, 'edit'])->name('items.edit');
});

Route::prefix('/socialItems')->middleware('auth')->group(function () {
    Route::get('/', [UserSocialItemController::class, 'index'])->name('socialItems');
    Route::post('/', [UserSocialItemController::class, 'store'])->name('socialItems.store');
    Route::post('update', [UserSocialItemController::class, 'update'])->name('socialItems.update');
    Route::delete('/deleteSelected', [UserSocialItemController::class, 'deleteSelected'])->name('socialItems.deleteSelected');
    Route::delete('/{example}', [UserSocialItemController::class, 'destroy'])->name('socialItems.destroy');
    // Route::get('/create', [UserSocialItemController::class, 'create'])->name('socialItems.create');
    // Route::get('/{example}', [UserSocialItemController::class, 'show'])->name('socialItems.show');
    // Route::get('/{example}/edit', [UserSocialItemController::class, 'edit'])->name('socialItems.edit');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ExampleController;
use App\Http\Controllers\ProfileController;

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

Route::prefix('/examples')->middleware('auth')->group(function () {
    Route::get('/', [ExampleController::class, 'index'])->name('examples');
    Route::post('/', [ExampleController::class, 'store'])->name('examples.store');
    Route::post('update', [ExampleController::class, 'update'])->name('examples.update');
    Route::delete('/deleteSelected', [ExampleController::class, 'deleteSelected'])->name('examples.deleteSelected');
    Route::delete('/{example}', [ExampleController::class, 'destroy'])->name('examples.destroy');
    // Route::get('/create', [ExampleController::class, 'create'])->name('examples.create');
    // Route::get('/{example}', [ExampleController::class, 'show'])->name('examples.show');
    // Route::get('/{example}/edit', [ExampleController::class, 'edit'])->name('examples.edit');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

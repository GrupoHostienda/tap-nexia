<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
// Controllers
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LinkTypeController;
use App\Http\Controllers\LinkSchemaController;

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

Route::prefix('/link-types')->middleware('auth')->group(function () {
    Route::get('/', [LinkTypeController::class, 'index'])->name('linkType');
    Route::post('/', [LinkTypeController::class, 'store'])->name('linkType.store');
    Route::post('update', [LinkTypeController::class, 'update'])->name('linkType.update');
    Route::delete('/deleteSelected', [LinkTypeController::class, 'deleteSelected'])->name('linkType.deleteSelected');
    Route::delete('/{type}', [LinkTypeController::class, 'destroy'])->name('linkType.destroy');
    // Route::get('/create', [LinkTypeController::class, 'create'])->name('items.create');
    // Route::get('/{example}', [LinkTypeController::class, 'show'])->name('items.show');
    // Route::get('/{example}/edit', [LinkTypeController::class, 'edit'])->name('items.edit');
});

Route::prefix('/link-schemas')->middleware('auth')->group(function () {
    Route::get('/', [LinkSchemaController::class, 'index'])->name('linkSchema');
    Route::post('/', [LinkSchemaController::class, 'store'])->name('linkSchema.store');
    Route::post('update', [LinkSchemaController::class, 'update'])->name('linkSchema.update');
    Route::delete('/deleteSelected', [LinkSchemaController::class, 'deleteSelected'])->name('linkSchema.deleteSelected');
    Route::delete('/{type}', [LinkSchemaController::class, 'destroy'])->name('linkSchema.destroy');
    // Route::get('/create', [LinkSchemaController::class, 'create'])->name('items.create');
    // Route::get('/{example}', [LinkSchemaController::class, 'show'])->name('items.show');
    // Route::get('/{example}/edit', [LinkSchemaController::class, 'edit'])->name('items.edit');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

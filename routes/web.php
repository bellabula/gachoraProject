<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
//api controller
use App\Http\Controllers\HomeDirectToController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/faq', function () {
    return Inertia::render('FAQ');
})->name('faq');



Route::get('/gachaHome', function () {
    return Inertia::render('Gacha/B_1_GachaHome');
})->name('gachaHome');

// 首頁: Gachora, 扭蛋, 一番賞, 會員
Route::view('/api', 'apihome');
Route::view('/api/egg', 'apiEgg');
Route::view('/api/ichiban', 'apiIchiban');
Route::view('/api/user', 'apiUser');




require __DIR__ . '/auth.php';


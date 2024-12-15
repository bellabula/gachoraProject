<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
//api controller
use App\Http\Controllers\HomeDirectToController;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function (Request $request) {
    return Inertia::render('Dashboard', [
        'highlight' => $request->query('highlight'), // 將 highlight 傳遞到前端
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::get('/faq', function (Request $request) {
    return Inertia::render('FAQ', [
        'goto' => $request->query('goto'), // 將 goto 傳遞到前端
    ]);
})->name('faq');


Route::get('/gachaHome', function () {
    return Inertia::render('Gacha/B_1_GachaHome');
})->name('gachaHome');

Route::get('/lottryHome', function () {
    return Inertia::render('lottry/C_1_LottryHome');
})->name('lottryHome');


Route::get('/gachadetail', function () {
    return Inertia::render('Gacha/B_3_GachaDetail');
})->name('gachadetail');

Route::get('/lottrydetail', function () {
    return Inertia::render('lottry/C_3_LottryDetail');
})->name('lottrydetail');

Route::get('/gachatagpage', function () {
    return Inertia::render('Gacha/B_2_GachaTagPage');
})->name('gachatagpage');

Route::get('/lottrytagpage', function () {
    return Inertia::render('lottry/C_2_LottryTagPage');
})->name('lottrytagpage');

Route::get('/shoppingCart', function () {
    return Inertia::render('shoppingCart/Cart');
})->middleware(['auth', 'verified'])->name('shoppingCart');


// 首頁: Gachora, 扭蛋, 一番賞, 會員
Route::view('/api', 'apihome');
Route::view('/api/egg', 'apiEgg');
Route::view('/api/ichiban', 'apiIchiban');
Route::view('/api/user', 'apiUser');




require __DIR__ . '/auth.php';

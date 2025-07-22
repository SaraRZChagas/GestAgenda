<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/client/dashboard', fn () => Inertia::render('client/dashboard'))->name('client.dashboard');
    Route::get('/professional/dashboard', fn () => Inertia::render('professional/dashboard'))->name('professional.dashboard');
});



Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

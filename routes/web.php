<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Professional\DashboardController;
use App\Http\Controllers\Professional\ServiceController;
use App\Http\Controllers\Professional\SchedulingRuleController;
use App\Http\Controllers\Professional\AppointmentController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/client/dashboard', fn () => Inertia::render('client/dashboard'))->name('client.dashboard');
    Route::get('/professional/dashboard', fn () => Inertia::render('professional/dashboard'))->name('professional.dashboard');
});

Route::middleware(['auth', 'verified'])->prefix('professional')->name('professional.')
->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');    
    Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
    Route::get('/scheduling-rules', [SchedulingRuleController::class, 'index'])->name('scheduling-rules.index');
    Route::get('/appointments/history', [AppointmentController::class, 'history'])->name('appointments.history');


});

Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

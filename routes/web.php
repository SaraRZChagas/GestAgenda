<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PublicProfileController;
use App\Http\Controllers\Professional\DashboardController;
use App\Http\Controllers\Professional\ServiceController;
use App\Http\Controllers\Professional\SchedulingRuleController;
use App\Http\Controllers\Professional\AppointmentController;
use App\Http\Controllers\Professional\ScheduleBlockController;
use App\Http\Controllers\Professional\WorkingHourController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');
Route::get('/profissional/{username}', [PublicProfileController::class, 'show']);

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboards
    Route::get('/client/dashboard', fn () => Inertia::render('client/dashboard'))->name('client.dashboard');
    //Route::get('/professional/dashboard', fn () => Inertia::render('professional/dashboard'))->name('professional.dashboard');
    Route::get('/professional/dashboard', [DashboardController::class, 'index'])->name('professional.dashboard');

    Route::get('/settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/settings/profile', [ProfileController::class, 'update'])->name('profile.update');

    // Rotas do profissional
    Route::prefix('professional')->name('professional.')->group(function () {
        // Serviços
        Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
        Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
        Route::put('/services/{service}', [ServiceController::class, 'update'])->name('services.update');
        Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('services.destroy');

        // Regras de agendamento
        Route::get('/scheduling-rules', [SchedulingRuleController::class, 'index'])->name('scheduling-rules.index');

        // Horários de trabalho
        Route::get('/working-hours', [WorkingHourController::class, 'index'])->name('working-hours.index');
        Route::post('/working-hours', [WorkingHourController::class, 'store'])->name('working-hours.store');
        Route::put('/working-hours/{id}', [WorkingHourController::class, 'update'])->name('working-hours.update');
        Route::delete('/working-hours/{id}', [WorkingHourController::class, 'destroy'])->name('working-hours.destroy');

        // Histórico de atendimentos
        Route::get('/appointments/history', [AppointmentController::class, 'history'])->name('appointments.history');

        // Bloqueios de agenda
        Route::get('schedule-blocks', [ScheduleBlockController::class, 'index'])->name('schedule-blocks.index');
        Route::post('schedule-blocks', [ScheduleBlockController::class, 'store'])->name('schedule-blocks.store');
        Route::post('schedule-blocks/types', [ScheduleBlockController::class, 'storeType'])->name('schedule-blocks.storeType');
        Route::delete('/professional/schedule-blocks/{id}', [ScheduleBlockController::class, 'destroy'])->name('professional.schedule-blocks.destroy');
        Route::put('/professional/schedule-blocks/{id}', [ScheduleBlockController::class, 'update'])->name('professional.schedule-blocks.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

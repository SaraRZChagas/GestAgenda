<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Professional;
use Inertia\Inertia;

class PublicProfileController extends Controller
{
    public function show($username)
    {
        $user = User::where('username', $username)
                ->with(['professional.services'])
                ->firstOrFail();

    $professional = Professional::whereHas('user', function ($query) use ($username) {
    $query->where('username', $username);
})->with('services')->firstOrFail();

    // Montar horários formatados
    $hoursFormatted = $professional?->workingHours?->map(function ($h) {
        $days = [
            1 => 'Seg', 2 => 'Ter', 3 => 'Qua', 4 => 'Qui', 5 => 'Sex', 6 => 'Sáb', 0 => 'Dom'
        ];
        return ($days[$h->weekdayWorkingHours] ?? $h->weekdayWorkingHours) .
            ' ' . substr($h->startTimeWorkingHours, 0, 5) .
            ' - ' . substr($h->endTimeWorkingHours, 0, 5);
    })->join(', ');

    $profile = [
        'name'        => $user->name,
        'description' => $professional->bioProfessionals ?? '',
        'address'     => $professional->addressProfessionals ?? '',
        'profile_photo'       => env('APP_URL').'/storage/'.($professional->profile_photo ?? ''),
        'workingHours'=> $hoursFormatted,
        'contacts'    => $professional ? array_filter([$professional->phoneProfessionals]) : [],
        'services'    => $professional?->services->map(function ($service) {
            return [
                'id'          => $service->idServices,
                'name'        => $service->nameServices,
                'description' => $service->descriptionServices,
                'price'       => $service->priceServices,
                'duration'    => $service->durationMinutesServices . ' minutos',
                'image'       => '/images/placeholder.png', // ajustar quando houver imagem
            ];
        }) ?? [],
    ];

    return Inertia::render('PublicProfile', [
        'profile' => $profile
    ]);
}
}
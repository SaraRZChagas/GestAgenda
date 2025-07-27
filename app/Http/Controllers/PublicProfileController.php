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
            ->with([
                'professional.services',
                'professional.workingHours',
                'professional.contacts.contactType',
                'professional.scheduleBlocks.blockType',
            ])
            ->firstOrFail();

        $professional = $user->professional;

    // Montar horários formatados de forma legível
        $days = [0 => 'Dom', 1 => 'Seg', 2 => 'Ter', 3 => 'Qua', 4 => 'Qui', 5 => 'Sex', 6 => 'Sáb'];
        $hoursFormatted = $professional?->workingHours?->map(function ($h) use ($days) {
            // Substitua os campos conforme seu modelo
            return ($days[$h->weekdayWorkingHours ?? $h->dayOfWeek] ?? $h->weekdayWorkingHours) . ' ' .
                substr($h->startTimeWorkingHours ?? $h->startTime, 0, 5) . ' - ' .
                substr($h->endTimeWorkingHours ?? $h->endTime, 0, 5);
        })->join(', ');

        // Montar contatos formatados (ex: "Telefone: 123456", "Instagram: @usuario")
        $contacts = $professional?->contacts?->map(function ($c) {
            $type = optional($c->contactType)->nameContactsTypes ?? 'Contato';
            return $type . ': ' . $c->descContacts;
        })->filter()->values() ?? collect();

    $profile = [
        'name' => $professional->nameBusinessProfessionals ?: $user->name,
        'description' => $professional->bioProfessionals ?? '',
        'address' => $professional->addressProfessionals ?? '',
        'profile_photo' => $professional->profile_photo 
            ? env('APP_URL') . '/storage/' . $professional->profile_photo 
            : '/images/avatar_placeholder.svg',
        'workingHours' => $hoursFormatted ?: 'Não informado',
        'contacts' => $contacts->toArray(),
        'services' => $professional?->services?->map(function ($service) {
            return [
                'id' => $service->idServices,
                'name' => $service->nameServices,
                'description' => $service->descriptionServices,
                'price' => number_format($service->priceServices, 2, ',', '.'), // exemplo formatação R$
                'duration' => ($service->durationMinutesServices ?? '?') . ' minutos',
                'image' => $service->profile_photo 
                    ? asset('storage/' . $service->profile_photo) 
                    : '/images/placeholder.png',
                ];
        })->toArray() ?? [],
        'blocks' => $professional->scheduleBlocks ?? [],
        'workingHoursArray' => $professional->workingHours ?? [],
    ];

    return Inertia::render('PublicProfile', [
        'profile' => $profile
    ]);
}
}
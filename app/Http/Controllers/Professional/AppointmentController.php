<?php

namespace App\Http\Controllers\Professional;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;

class AppointmentController extends Controller
{
    public function history(): Response
    {
        return Inertia::render('professional/appointments-history', [
            'breadcrumbs' => [
                ['name' => 'Dashboard', 'href' => route('professional.dashboard')],
                ['name' => 'Histórico de Atendimentos'],
            ],
        ]);
    }
}
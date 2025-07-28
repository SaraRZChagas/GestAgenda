<?php

namespace App\Http\Controllers\Professional;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\ScheduleBlock;
use App\Models\WorkingHour;
use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;

class DashboardController
{
     public function index(): Response
        {
            $professionalId = Auth::user()->professional->idProfessionals;

        $blocks = ScheduleBlock::with('blockType')
            ->where('idProfessionals', $professionalId)
            ->get();

        $workingHours = WorkingHour::where('idProfessionals', $professionalId)
            ->get();

        $appointments = Appointment::with(['customer', 'service'])
            ->where('idProfessionals', $professionalId)
            ->get();
            
            
        return Inertia::render('professional/dashboard', [
            'blocks' => $blocks,
            'workingHours' => $workingHours,
            'appointments' => $appointments, 
            'breadcrumbs' => [
                ['name' => 'Dashboard', 'href' => route('professional.dashboard')],
            ],
            
        ]);

    }
}
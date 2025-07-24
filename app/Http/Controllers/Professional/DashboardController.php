<?php

namespace App\Http\Controllers\Professional;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\ScheduleBlock;
use App\Models\WorkingHour;
use Illuminate\Support\Facades\Auth;

class DashboardController
{
     public function index(): Response
        {
            $professionalId = Auth::user()->professional->idProfessionals;

        $blocks = ScheduleBlock::with('blockType')
            ->where('idProfessionals', $professionalId)
            ->get();

        $workingHours = WorkingHour::where('idProfessionals', $professionalId)->get();
            
        return Inertia::render('professional/dashboard', [
            'breadcrumbs' => [
                ['name' => 'Dashboard', 'href' => route('professional.dashboard')],
            ],
            'blocks' => $blocks,
            'workingHours' => $workingHours,
        ]);

    }
}
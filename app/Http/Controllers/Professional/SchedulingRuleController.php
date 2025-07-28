<?php

namespace App\Http\Controllers\Professional;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class SchedulingRuleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('professional/scheduling-rules', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => route('professional.dashboard')],
                ['title' => 'Regras de Agendamento', 'href' => route('professional.scheduling-rules.index')],
            ],
        ]);
    }
}
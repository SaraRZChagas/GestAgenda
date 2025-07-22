<?php

namespace App\Http\Controllers\Professional;

use Inertia\Inertia;
use Inertia\Response;

class DashboardController
{
     public function index(): Response
    {
        return Inertia::render('professional/dashboard', [
            'breadcrumbs' => [
                ['name' => 'Dashboard', 'href' => route('professional.dashboard')],
            ],
        ]);
    }

  
}
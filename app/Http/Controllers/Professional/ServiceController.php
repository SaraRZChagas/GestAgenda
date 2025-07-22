<?php

namespace App\Http\Controllers\Professional;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;


namespace App\Http\Controllers\Professional;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('professional/services', [
            'breadcrumbs' => [
                ['title' => 'Dashboard', 'href' => route('professional.dashboard')],
                ['title' => 'Serviços', 'href' => route('professional.services.index')],
            ],
        ]);
    }
}
<?php

namespace App\Http\Controllers\Client;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Inertia\Inertia;
use Inertia\Response;

class ClientDashboardController extends Controller
{
    // Marcações futuras (hoje/em diante)

    public function futureAppointments()
    {
        $user = Auth::user();
        $now = now();

        // Obter o cliente relacionado ao usuário autenticado
        $customer = $user->customer;
        if (!$customer) {
            abort(404, 'Cliente não encontrado para o usuário.');
        }

        $appointments = Appointment::with(['professional', 'service'])
            ->where('idCustomers', $customer->idCustomers)
            ->where('startDatetimeAppointments', '>=', $now)
            ->orderBy('startDatetimeAppointments')
            ->get();

        return Inertia::render('client/appointments/Future', [
            'appointments' => $appointments,
        ]);
    }

    public function pastAppointments()
    {
        $user = Auth::user();
        $now = now();

        $customer = $user->customer;
        if (!$customer) {
            abort(404, 'Cliente não encontrado para o usuário.');
        }

        $appointments = Appointment::with(['professional', 'service'])
            ->where('idCustomers', $customer->idCustomers)
            ->where('startDatetimeAppointments', '<', $now)
            ->orderByDesc('startDatetimeAppointments')
            ->get();

        return Inertia::render('client/appointments/Past', [
            'appointments' => $appointments,
        ]);
    }
}
<?php

namespace App\Http\Controllers\Professional;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function search()
    {
        $professionalId = auth()->user()->professional->id;

        // Buscar todos os clientes que têm alguma marcação com este profissional
        // Ajuste a query conforme o relacionamento do seu banco
        $customers = Customer::all() ?? [];

        return Inertia::render('professional/clients/Search', [
            'customers' => $customers,
        ]);
    }

    public function show($id)
    {
        $professionalId = auth()->user()->professional->idProfessionals;

        // Busca o cliente pelo ID, sem filtro de ter marcações
        $customer = Customer::where('idCustomers', $id)
            ->select('idCustomers', 'nameCustomers', 'phoneCustomers', 'addressCustomers') 
            ->firstOrFail();

        $appointments = Appointment::where('idCustomers', $id)
            ->where('idProfessionals', $professionalId)
            ->with('service')
            ->orderBy('startDatetimeAppointments', 'desc')
            ->get();

        return Inertia::render('professional/clients/Show', [
            'customer' => $customer,
            'appointments' => $appointments,
        ]);
    }

}

<?php

namespace App\Http\Controllers\Professional;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;



class ProfessionalQuickClientController extends Controller
{
    public function store(Request $request)
    {
        // Validação simples
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'unique:users,username'],
            'phone' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        // Cria usuário
        $user = User::create([
            'name' => $data['name'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'client',
        ]);

        // Cria customer vinculado
        $customer = Customer::create([
            'idUsers' => $user->id,
            'nameCustomers' => $data['name'],
            'phoneCustomers' => $data['phone'],
        ]);

        return to_route('professional.quick-client.form')
        ->with('success', 'Serviço criado com sucesso!');
    }
}

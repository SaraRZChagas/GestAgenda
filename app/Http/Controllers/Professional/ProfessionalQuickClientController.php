<?php

namespace App\Http\Controllers\Professional;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Models\Customer;
use App\Models\Professional;



class ProfessionalQuickClientController extends Controller
{
    public function store(Request $request)
    {
        // Validação simples
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:50', 'unique:users,username', 'regex:/^[a-z0-9_]+$/'],
            'phone' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
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

        $user->professional()->create([
            'idUsers' => $user->id,
            'nameProfessionals'  => $data['name'],
            'phoneProfessionals' => $data['phone'],
            // 'profile_photo' => null,
        ]);

        return to_route('professional.quick-client.form')
        ->with('success', 'Cliente criado com sucesso!');
    }
}

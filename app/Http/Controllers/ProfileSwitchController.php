<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileSwitchController extends Controller
{
    public function switchProfile(Request $request)
    {
        $user = Auth::user();

        // Troca o role entre 'professional' e 'client'
        $user->role = ($user->role === 'professional') ? 'client' : 'professional';
        $user->save();

        // Atualiza a sessão para garantir consistência, se quiser
        session(['role' => $user->role]);

        // Redireciona para o dashboard do novo perfil ativo
        return redirect()->route($user->role . '.dashboard');
    }
}

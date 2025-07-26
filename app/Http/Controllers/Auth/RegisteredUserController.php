<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone' => ['required', 'regex:/^\+?[0-9\s\-]{9,20}$/'],
            'username' => ['required','string','max:50','unique:users,username','regex:/^[a-z0-9_]+$/'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'in:client,professional'],
            'profile_photo' => 'nullable|image|mimes:jpg,jpeg,png|max:512|dimensions:max_width=400,max_height=500'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        \Log::info(' 1 Logging with:', [
            'customer' => $user->customer,
            'professional' => $user->professional,
            'user' => $user,
        ]);

        $user->load('customer', 'professional'); 

        \Log::info(' 2 Logging with:', [
            'customer' => $user->customer,
            'professional' => $user->professional,
            'user' => $user,
        ]);

        // Upload da imagem, se existir
        if ($request->hasFile('profile_photo')) {
            $folder = $request->role === 'professional' ? 'profissional_img' : 'cliente_img';
            $photoPath = $request->file('profile_photo')->store("images/{$folder}/{$request->username}", 'public');
        }

        \Log::info(' 3 Logging with:', [
            'customer' => $user->customer,
            'professional' => $user->professional,
            'user' => $user,
        ]);
        // Criar ambos os registros relacionados

        $user->professional()->updateOrCreate(
            ['idUsers' => $user->id], 
            [
            'nameProfessionals' => $request->name,
            'phoneProfessionals' => $request->phone,
            'profile_photo' => $photoPath ?? null,
        ]);

        \Log::info(' 4 Logging with:', [
            'customer' => $user->customer,
            'professional' => $user->professional,
            'user' => $user,
        ]);

        $user->customer()->updateOrCreate(['idUsers' => $user->id], [
            'nameCustomers' => $request->name,
            'phoneCustomers' => $request->phone,
            'profile_photo' => $photoPath ?? null,
        ]);

        $user->load('customer', 'professional'); 

        \Log::info(' 5 Logging with:', [
            'customer' => $user->customer,
            'professional' => $user->professional,
            'user' => $user,
        ]);

        event(new Registered($user));

        Auth::login($user);

         return redirect()->intended($user->role === 'professional' ? route('professional.dashboard') : route('client.dashboard'));
    }
}

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

        // Upload da imagem, se existir
        if ($request->hasFile('profile_photo')) {
            $folder = $request->role === 'professional' ? 'profissional_img' : 'cliente_img';
            $path = $request->file('profile_photo')->store("images/{$folder}", 'public');
        }

        // Criar registro em clients ou professionals
        if ($request->role === 'professional') {
            $user->professional()->create([
            'phoneProfessionals' => $request->phone,
            'profile_photo' => $photoPath ?? null,
            ]);
        } else {
            $user->client()->create([
                'phoneCustomers' => $request->phone,
                'profile_photo' => $photoPath ?? null,
            ]);
        }
        event(new Registered($user));

        Auth::login($user);

         return redirect()->intended($user->role === 'professional' ? route('professional.dashboard') : route('client.dashboard'));
    }
}

<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        $user->load(['customer', 'professional']);

        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'userExtraData' => $user->role === 'client'
                ? $user->customer
                : $user->professional,
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
        {
            $user = $request->user();

            $user->fill($request->only(['name', 'email']));

            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }

            $user->save();

            // Atualiza os dados extras
            if ($user->role === 'client') {
                $user->customer()?->update([
                    'phoneCustomers' => $request->input('phone'),
                    'addressCustomers' => $request->input('address'),
                ]);
            } elseif ($user->role === 'professional') {
                $user->professional()?->update([
                    'phoneProfessionals' => $request->input('phone'),
                    'addressProfessionals' => $request->input('address'),
                ]);
            }

            if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $path;
            $user->save();
        }

            return to_route('profile.edit')->with('status', 'profile-updated');
        }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}

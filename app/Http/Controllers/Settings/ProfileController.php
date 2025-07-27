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
use App\Models\Contact;
use App\Models\ContactType;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        $user->load([
            'customer.contacts.contactType',
            'professional.contacts.contactType',
        ]);

        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'userExtraData' => $user->role === 'client'
                ? $user->customer
                : $user->professional,
            'contacts' => $user->role === 'client'
                ? $user->customer?->contacts ?? []
                : $user->professional?->contacts ?? [],
            'contactTypes' => \App\Models\ContactType::all(),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        \Log::info(' 1 Logging with:', [
            'request' => $request,
        ]);
        \Log::info(' 2 Logging with:', [
            'name' => $request->input('name'),
        ]);
                \Log::info(' 3 Logging with:', [
            'id' => $id
        ]);

        $user = $request->user();

        // Atualiza dados básicos do user
        $user->fill($request->only(['name', 'email']));

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // Upload do avatar se houver
        $path = null;
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
        }

        // Atualiza os dados extras
        if ($user->role === 'client') {
            $customer = $user->customer;
            $customer->update([
                'nameCustomers' => $request->input('name'),
                'phoneCustomers' => $request->input('phone'),
                'addressCustomers' => $request->input('address'),
                'profile_photo' => $path,
            ]);
            $this->syncContacts($customer->idCustomers, null, $request->input('contacts', []));
        } elseif ($user->role === 'professional') {
                $professional = $user->professional;
                $professional->update([
                    'nameProfessionals' => $request->input('name'),
                    'phoneProfessionals' => $request->input('phone'),
                    'addressProfessionals' => $request->input('address'),
                    'profile_photo' => $path,
                    'bioProfessionals' => $request->input('bioProfessionals'),
                    'nameBusinessProfessionals' => $request->input('nameBusinessProfessionals'),
                ]);
            $this->syncContacts(null, $professional->idProfessionals, $request->input('contacts', []));
        }     

        return to_route('profile.edit')->with('status', 'profile-updated');
    }

/**
     * Sincroniza contatos (update/create/delete)
     * @param int|null $customerId
     * @param int|null $professionalId
     * @param array $contactsData
     */
    protected function syncContacts(?int $customerId, ?int $professionalId, array $contactsData): void
    {
        // Busca contatos existentes para o perfil
        if ($customerId !== null) {
            $existingContactIds = Contact::where('idCustomers', $customerId)->pluck('idContacts')->toArray();
        } else {
            $existingContactIds = Contact::where('idProfessionals', $professionalId)->pluck('idContacts')->toArray();
        }

        $receivedContactIds = collect($contactsData)->pluck('idContacts')->filter()->all();

        // Excluir contatos removidos no frontend
        $toDelete = array_diff($existingContactIds, $receivedContactIds);
        Contact::whereIn('idContacts', $toDelete)->delete();

        // Atualizar ou criar contatos
        foreach ($contactsData as $contact) {
            if (isset($contact['idContacts'])) {
                // Atualiza contato existente
                Contact::where('idContacts', $contact['idContacts'])->update([
                    'descContacts' => $contact['descContacts'] ?? null,
                    'idContactsTypes' => $contact['idContactsTypes'] ?? null,
                    'isActiveContacts' => $contact['isActiveContacts'] ?? true,
                ]);
            } else {
                // Cria contato novo
                if (!empty($contact['descContacts'])) {
                    Contact::create([
                        'descContacts' => $contact['descContacts'],
                        'idContactsTypes' => $contact['idContactsTypes'],
                        'isActiveContacts' => $contact['isActiveContacts'] ?? true,
                        'idCustomers' => $customerId,
                        'idProfessionals' => $professionalId,
                    ]);
                }
            }
        }
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


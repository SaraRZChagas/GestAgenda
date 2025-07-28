<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        $rules [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'phone' => ['nullable', 'string', 'max:20'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:512', 'dimensions:max_width=400,max_height=500'],
        
            // campos básicos
            'contacts' => ['sometimes', 'array'],
            'contacts.*.idContacts' => ['sometimes', 'integer', 'exists:Contacts,idContacts'],
            'contacts.*.descContacts' => ['required_with:contacts', 'string', 'max:45'],
            'contacts.*.idContactsTypes' => ['required_with:contacts', 'integer', 'exists:ContactsTypes,idContactsTypes'],
            'contacts.*.isActiveContacts' => ['boolean'],
        ];
        // Campos extras para profissionais
        if ($this->user()->role === 'professional') {
            $rules['username'] = [
                'required',
                'string',
                'max:50',
                Rule::unique(User::class)->ignore($this->user()->id),
            ];
            $rules['bioProfessionals'] = ['nullable', 'string', 'max:1024'];
            $rules['nameBusinessProfessionals'] = ['nullable', 'string', 'max:45'];
            
        }

        return $rules;

    }
}

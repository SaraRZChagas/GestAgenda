<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;



class StoreServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nameServices' => 'required|string|max:45',
            'descriptionServices' => 'nullable|string|max:500',
            'priceServices' => 'required|numeric|min:0',
            'durationMinutesServices' => 'required|integer|min:1',
            'idServicesTypes' => 'nullable|exists:ServicesTypes,idServicesTypes',
            'isActiveServices' => 'nullable|boolean',
        ];
    }
}


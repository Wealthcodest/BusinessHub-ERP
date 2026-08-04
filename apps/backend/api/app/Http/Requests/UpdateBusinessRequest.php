<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBusinessRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'website' => 'nullable|url',
            'registration_number' => 'nullable|string|max:100',
            'tax_number' => 'nullable|string|max:100',
            'address' => 'nullable|string',
            'country' => 'nullable|string|max:100',
            'currency' => 'nullable|string|max:10',
            'timezone' => 'nullable|string|max:100',
            'status' => 'nullable|boolean',
            'logo' => 'nullable|string',
        ];
    }
}

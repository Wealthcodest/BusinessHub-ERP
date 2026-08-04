<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BusinessResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'website' => $this->website,
            'registration_number' => $this->registration_number,
            'tax_number' => $this->tax_number,
            'address' => $this->address,
            'country' => $this->country,
            'currency' => $this->currency,
            'timezone' => $this->timezone,
            'logo' => $this->logo,
            'status' => $this->status,
            'created_at' => $this->created_at,
        ];
    }
}
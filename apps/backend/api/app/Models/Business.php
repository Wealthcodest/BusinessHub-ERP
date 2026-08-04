<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'website',
        'registration_number',
        'tax_number',
        'address',
        'country',
        'currency',
        'timezone',
        'status',
        'logo',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function customers(): HasMany { return $this->hasMany(Customer::class); }
    public function projects(): HasMany { return $this->hasMany(Project::class); }
    public function quotations(): HasMany { return $this->hasMany(Quotation::class); }
    public function invoices(): HasMany { return $this->hasMany(Invoice::class); }
    public function payments(): HasMany { return $this->hasMany(Payment::class); }
    public function expenses(): HasMany { return $this->hasMany(Expense::class); }
}

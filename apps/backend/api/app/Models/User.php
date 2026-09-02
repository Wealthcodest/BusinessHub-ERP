<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function createdQuotations(): HasMany { return $this->hasMany(Quotation::class, 'created_by_user_id'); }
    public function createdInvoices(): HasMany { return $this->hasMany(Invoice::class, 'created_by_user_id'); }
    public function recordedPayments(): HasMany { return $this->hasMany(Payment::class, 'recorded_by_user_id'); }
    public function voidedPayments(): HasMany { return $this->hasMany(Payment::class, 'voided_by_user_id'); }
    public function performedPaymentAudits(): HasMany { return $this->hasMany(PaymentAudit::class, 'performed_by_user_id'); }
    public function createdExpenses(): HasMany { return $this->hasMany(Expense::class, 'created_by_user_id'); }
}

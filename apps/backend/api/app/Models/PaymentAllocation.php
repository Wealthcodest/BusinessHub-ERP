<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class PaymentAllocation extends Model { protected $fillable=['payment_id','invoice_id','project_id','allocated_amount']; protected function casts(): array{return ['allocated_amount'=>'decimal:2'];} public function payment(){return $this->belongsTo(Payment::class);} public function invoice(){return $this->belongsTo(Invoice::class);} public function project(){return $this->belongsTo(Project::class);} }
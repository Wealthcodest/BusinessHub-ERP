<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class PaymentAudit extends Model { public const UPDATED_AT=null; protected $fillable=['payment_id','action','field_name','old_value','new_value','reason','performed_by_user_id']; protected function casts(): array{return ['old_value'=>'array','new_value'=>'array','created_at'=>'datetime'];} public function payment(){return $this->belongsTo(Payment::class);} public function performedBy(){return $this->belongsTo(User::class,'performed_by_user_id');} }
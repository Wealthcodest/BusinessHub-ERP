<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->restrictOnDelete();
            $table->string('name'); $table->string('email')->nullable(); $table->string('phone')->nullable();
            $table->text('address')->nullable(); $table->string('city')->nullable(); $table->string('state')->nullable();
            $table->string('country')->nullable(); $table->string('tax_number')->nullable(); $table->string('status')->default('active');
            $table->timestamps(); $table->index(['business_id', 'status']);
        });
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->restrictOnDelete();
            $table->foreignId('customer_id')->constrained()->restrictOnDelete();
            $table->string('project_number'); $table->string('name'); $table->text('description')->nullable();
            $table->string('status')->default('active'); $table->date('start_date')->nullable();
            $table->date('expected_end_date')->nullable(); $table->timestamp('completed_at')->nullable(); $table->timestamps();
            $table->unique(['business_id', 'project_number']); $table->index(['customer_id', 'status']);
        });
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->restrictOnDelete(); $table->foreignId('customer_id')->constrained()->restrictOnDelete();
            $table->foreignId('project_id')->nullable()->constrained()->nullOnDelete(); $table->string('quotation_number');
            $table->date('issue_date'); $table->date('valid_until')->nullable(); $table->string('status')->default('draft'); $table->string('currency', 10)->nullable();
            $table->decimal('subtotal', 20, 2)->default(0); $table->decimal('discount', 20, 2)->nullable(); $table->decimal('tax', 20, 2)->nullable(); $table->decimal('grand_total', 20, 2)->default(0);
            $table->text('notes')->nullable(); $table->text('terms')->nullable(); $table->foreignId('created_by_user_id')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps();
            $table->unique(['business_id', 'quotation_number']); $table->index(['customer_id', 'status']);
        });
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_id')->constrained()->restrictOnDelete(); $table->foreignId('customer_id')->constrained()->restrictOnDelete();
            $table->foreignId('project_id')->nullable()->constrained()->nullOnDelete(); $table->foreignId('quotation_id')->nullable()->constrained()->nullOnDelete(); $table->string('invoice_number');
            $table->date('issue_date'); $table->date('due_date')->nullable(); $table->string('status')->default('draft'); $table->string('currency', 10)->nullable();
            $table->decimal('subtotal', 20, 2)->default(0); $table->decimal('discount', 20, 2)->nullable(); $table->decimal('tax', 20, 2)->nullable(); $table->decimal('grand_total', 20, 2)->default(0);
            $table->decimal('amount_paid', 20, 2)->default(0); $table->decimal('balance', 20, 2)->default(0); $table->text('notes')->nullable(); $table->text('terms')->nullable();
            $table->foreignId('created_by_user_id')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps();
            $table->unique(['business_id', 'invoice_number']); $table->index(['customer_id', 'status']); $table->index('project_id'); $table->index('quotation_id');
        });
        Schema::create('payments', function (Blueprint $table) {
            $table->id(); $table->foreignId('business_id')->constrained()->restrictOnDelete(); $table->foreignId('customer_id')->constrained()->restrictOnDelete();
            $table->date('payment_date'); $table->decimal('amount', 20, 2); $table->string('payment_method'); $table->string('reference')->nullable(); $table->text('notes')->nullable();
            $table->string('receipt_number'); $table->string('status')->default('posted'); $table->foreignId('recorded_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('voided_by_user_id')->nullable()->constrained('users')->nullOnDelete(); $table->text('void_reason')->nullable(); $table->timestamp('voided_at')->nullable(); $table->timestamps();
            $table->unique(['business_id', 'receipt_number']); $table->index(['business_id', 'payment_date']); $table->index(['customer_id', 'status']);
        });
        Schema::create('payment_allocations', function (Blueprint $table) {
            $table->id(); $table->foreignId('payment_id')->constrained()->restrictOnDelete(); $table->foreignId('invoice_id')->constrained()->restrictOnDelete();
            $table->foreignId('project_id')->nullable()->constrained()->nullOnDelete(); $table->decimal('allocated_amount', 20, 2); $table->timestamps(); $table->index(['invoice_id', 'project_id']);
        });
        Schema::create('payment_audits', function (Blueprint $table) {
            $table->id(); $table->foreignId('payment_id')->constrained()->restrictOnDelete(); $table->string('action'); $table->string('field_name')->nullable();
            $table->json('old_value')->nullable(); $table->json('new_value')->nullable(); $table->text('reason')->nullable(); $table->foreignId('performed_by_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('created_at')->useCurrent(); $table->index(['payment_id', 'created_at']); $table->index('action');
        });
        Schema::create('expenses', function (Blueprint $table) {
            $table->id(); $table->foreignId('business_id')->constrained()->restrictOnDelete(); $table->foreignId('customer_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('project_id')->constrained()->restrictOnDelete(); $table->date('expense_date'); $table->string('category'); $table->text('description');
            $table->decimal('amount', 20, 2); $table->string('vendor')->nullable(); $table->string('payment_method')->nullable(); $table->string('reference')->nullable(); $table->text('notes')->nullable();
            $table->foreignId('created_by_user_id')->nullable()->constrained('users')->nullOnDelete(); $table->timestamps(); $table->index(['business_id', 'expense_date']); $table->index(['project_id', 'category']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('expenses'); Schema::dropIfExists('payment_audits'); Schema::dropIfExists('payment_allocations'); Schema::dropIfExists('payments');
        Schema::dropIfExists('invoices'); Schema::dropIfExists('quotations'); Schema::dropIfExists('projects'); Schema::dropIfExists('customers');
    }
};
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('quotations', function (Blueprint $table) { $table->index('quotation_number'); });
        Schema::table('invoices', function (Blueprint $table) { $table->index('invoice_number'); });
        Schema::table('payments', function (Blueprint $table) { $table->index('receipt_number'); });
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) { $table->dropIndex(['receipt_number']); });
        Schema::table('invoices', function (Blueprint $table) { $table->dropIndex(['invoice_number']); });
        Schema::table('quotations', function (Blueprint $table) { $table->dropIndex(['quotation_number']); });
    }
};

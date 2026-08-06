# Accounting Module

Accounting is planned as a double-entry ledger with chart of accounts, journals, periods, fiscal years, tax configuration, receivables, payables, and financial statements. Posted journals must be balanced and immutable; corrections occur through reversal or adjustment entries.

This module is backend-led because integrity, permissions, locks, and auditability are essential. The frontend should present guided posting and read-only reports, while Laravel transactions enforce debit/credit rules and MySQL preserves the audit trail.

# Future Schema

The initial schema should include `users`, `businesses`, business memberships/roles, `customers`, customer contacts and addresses, products, warehouses, stock movements, invoices, invoice items, payments, accounts, journal entries, journal lines, and audit logs.

Relationships must preserve business scoping: a customer, invoice, product, warehouse, and journal belongs to one business. Invoice items reference invoice headers and optionally products; stock movements reference products and warehouses; journal lines reference journal entries and accounts.

Use UUIDs or another documented public identifier strategy for API resources. Add unique constraints for document numbers within their business and period. Detailed columns and migration order should be agreed during backend design, before implementation.

# Customers Module

Customers is planned as the CRM foundation. It will own customer profiles, contact people, billing and shipping addresses, status, notes, and links to invoices and sales activity. Its list page should support search, filters, pagination, empty state, and create/edit/detail flows.

Create it as an independent feature using the Business module layout: schema, service/API boundary, pages, table/form components, and public exports. Every customer must be scoped to the active business. The future API should prevent duplicate customer identities according to the agreed email, phone, or registration rules.

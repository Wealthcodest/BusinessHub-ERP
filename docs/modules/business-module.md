# Business Module

The Business module is implemented and is the current architectural reference. It supports listing, searching, creating, viewing, editing, and deleting businesses. Routes are `/businesses`, `/businesses/new`, `/businesses/:id`, and `/businesses/:id/edit`.

`BusinessForm` uses `businessSchema` for fields including name, type, industry, registration and tax information, contact details, address, currency, timezone, status, description, and logo. `businessService` currently reads and writes browser `localStorage` and seeds a default business. Pages notify outcomes through `useToast`.

When Laravel arrives, keep page and form contracts stable, replace storage-backed service methods with API calls, map server validation errors into the form, and enforce business/tenant authorization on every operation.

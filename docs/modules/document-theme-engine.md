# Document Theme Engine

The Document Theme Engine provides reusable, business-scoped document appearance settings for invoices and quotations. It is designed for future purchase orders, receipts, delivery notes, credit notes, and debit notes.

## Theme data model

Each theme contains a stable `id`, `businessId`, name, palette (`primaryColor`, `secondaryColor`, `accentColor`), typography, header/footer/table styles, logo and watermark settings, print page settings, signature/stamp flags, timestamps, and the extensible `isDefault` flag.

The built-in **BusinessHub Professional** theme uses the BusinessHub teal palette, Inter typography, A4 portrait layout, and classic header/table defaults.

## Storage and service

Themes persist in browser storage under `businesshub_document_themes`. The shared `themeService` owns all storage access and exposes `getAll`, `getById`, `create`, `update`, `delete`, `setDefault`, and `getDefault` methods.

Themes are filtered by `businessId` for every operation. Replacing one business's themes preserves all other business records, so a business cannot access another business's theme list.

## Default behaviour

The first request for a business's themes creates one default theme only when it has no themes. It is persisted and reused on subsequent loads. The final theme cannot be deleted, ensuring every business always has a usable document theme.

## Document integration

Invoices and quotations store a `themeId` alongside their existing document data. Their shared `ThemeSelector` loads themes for the selected `businessId` and selects the business default for new or legacy documents that have no valid theme selection. Existing saved documents without `themeId` continue to load unchanged and use the default theme when edited or rendered.

## Theme management

Open **Settings → Document Themes** to manage themes for a selected business. The page shows responsive theme cards with palette, header, table, font, default status, and actions to preview, edit, set a default, or delete.

Creation and editing use one modal form. Each colour offers a synchronised colour picker and editable HEX value. Deletion uses the shared confirmation dialog. A business cannot lose its final theme; deleting a default theme promotes another available theme to the default. The preview modal uses sample customer, session, item, total, and footer content only, and never changes a real document.

## Branding configuration

Each theme has an extensible `branding` object. It controls logo visibility, left/centre/right placement, small/medium/large or bounded custom size (40–200px), original/square/rounded/circle shape, optional logo background, and each visible business identity line. The logo always comes from the current Business record; themes never store duplicate logo files.

Business name, tagline, address, phone, email, website, registration number, and tax number can be enabled independently. The optional business tagline is backward-compatible. If a business has no logo, documents display its generated initials instead of a broken image. Branding is shared by invoice and quotation rendering layers through reusable components. Current business identity is deliberately live; a later finalized/PDF architecture may introduce historical branding snapshots.

## Theme rendering pipeline

Document preview pages resolve appearance once before rendering: **Business → selected theme ID → `resolveDocumentTheme()` → branding → Invoice or Quotation Preview**. The resolver returns the normalized theme, branding settings, colours, and typography. It first uses the selected theme, then the business default, and finally a system default, so legacy documents with no `themeId` remain safe to render.

`InvoicePreview` and `QuotationPreview` receive that resolved result as a prop. They do not read theme storage themselves. Both pass the same `business` record and normalized `branding` object to `BusinessIdentityBlock`, which controls the live logo, placeholder initials, logo layout/shape/size, and the visibility of business identity fields.

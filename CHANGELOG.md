# Changelog

All notable changes to BusinessHub ERP are documented in this file.

## Unreleased

### Added

- Reusable toast notification system with success, error, warning, and info variants.
- Project documentation suite covering architecture, modules, API standards, testing, deployment, and engineering prompts.
- Reusable enterprise DataTable with search, sorting, pagination, selection, bulk-action placeholder, loading, empty, and action-menu states.
- Shared dashboard UI primitives including page headers, statistics, metrics, sections, breadcrumbs, avatars, search input, quick actions, and activity lists.
- Enterprise dashboard with business metrics sourced from local storage, activity placeholders, quick actions, and business overview table.
- Customer Management module with customer CRUD, business assignment, validation, local storage, seeded records, details, statistics, avatar support, data table, and navigation routes.
- Base64 file conversion utility for persistent Business logo uploads.

### Changed

- Business list now uses the shared DataTable and action dropdown.
- Business logo uploads are converted to Base64 before local storage persistence.
- Dashboard Customer quick action opens the Customer creation workflow.

### Fixed

- Business logos now persist correctly in local storage and remain available when editing or viewing businesses.

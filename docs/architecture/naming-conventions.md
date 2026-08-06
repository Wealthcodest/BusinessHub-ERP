# Naming Conventions

Use PascalCase for React components and component files: `BusinessDetailsPage.jsx`, `ToastProvider.jsx`. Use `use`-prefixed camelCase for hooks: `useBusinesses.js`. Services, schemas, utilities, and variables use camelCase: `businessService.js`, `businessSchema`, `refreshBusinesses`.

Name pages by user intent with the `Page` suffix. Name components by their responsibility, not their styling. Use action-oriented callbacks such as `onCreate`, `onDelete`, and `handleSubmit`; booleans start with `is`, `has`, `can`, or a clear state such as `loading`.

Routes use lowercase plural resources (`/businesses`) and identifiers (`/businesses/:id/edit`). Persisted fields use consistent camelCase in frontend contracts. Backend JSON should keep that convention unless a documented translation layer is introduced.

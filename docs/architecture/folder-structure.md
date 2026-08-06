# Folder Structure

```text
frontend/src/
  api/          HTTP configuration and endpoint contracts
  app/          application providers, router support, constants
  components/   reusable layout and UI components
    ui/         Button, Card, Input, Modal, Toast, and related primitives
  features/     self-contained business domains
    business/   pages, components, hooks, schemas, services, storage, API, data
    dashboard/  dashboard feature
  hooks/        shared React hooks
  layouts/      page shells such as DashboardLayout
  routes/       route declarations
  services/     shared service infrastructure
  utils/        pure helpers
```

Keep domain code inside its feature. A module may expose its public pages/components from a local `index.js`; consumers should use that public boundary instead of deep imports. Put a component in `components/ui` only when it is generic, reusable, and free of module business rules. Do not create a global "common" dumping ground.

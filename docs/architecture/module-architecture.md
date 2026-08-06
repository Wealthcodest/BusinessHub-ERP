# Module Architecture

A module owns one business capability and is structured as `features/<module>/pages`, `components`, `hooks`, `schemas`, `services`, `api`, `data`, and, only while needed, `storage`. Not every folder is mandatory; add it when it has a clear responsibility.

To add a module: create its feature folder; define domain schema and service contract; build reusable module components and pages; export the intended public API from `index.js`; add routes; add navigation only after routes exist; and verify loading, empty, validation, permission, and failure states. Keep API calls behind the feature service so local storage can later be replaced by Laravel without rewriting pages.

Feature components receive data and callbacks through props. Pages coordinate routing, services, local state, and feedback. Shared UI must not import a feature.

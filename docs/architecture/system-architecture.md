# System Architecture

BusinessHub ERP currently runs as a browser-based React single-page application. `main.jsx` mounts the application and global `ToastProvider`; `AppRoutes` maps routes into `DashboardLayout`; feature pages compose domain components and call feature services.

The Business module is the reference implementation. It has pages, components, a Zod schema, a hook, a service, storage, API boundary, and seed data. Its current persistence is `localStorage` under `businesshub_businesses`. This is a development implementation, not a production source of truth.

The target architecture keeps the frontend contract stable while replacing feature storage services with Laravel API clients. Laravel will enforce authentication, authorization, validation, transactions, audit records, and tenant/business scoping; MySQL will store relational ERP data. The frontend should never depend on MySQL schema details directly.

```text
React pages -> feature service/API client -> Laravel API -> MySQL
       |                 |
       +-> shared UI     +-> validation/error mapping
```

Cross-cutting UI feedback is supplied by React Context through `ToastProvider`; pages use `useToast` rather than browser alerts.

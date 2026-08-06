# Architecture Decision Log

This log records significant technical decisions for BusinessHub ERP. New entries should be added when a decision affects multiple modules, delivery practices, security, data integrity, or future maintenance.

## ADR-001: Use a feature-based frontend architecture

**Status:** Accepted  
**Decision:** Organize domain code under `frontend/src/features/<module>` and keep generic controls in `src/components/ui`.

**Rationale:** ERP domains grow independently. Keeping pages, components, schemas, hooks, and services close to the domain reduces coupling and makes modules easier to extend or replace.

**Consequences:** Features expose intentional public exports through local `index.js` files. Shared UI cannot depend on feature business rules.

## ADR-002: Use React 19, Vite, and JavaScript for the current frontend

**Status:** Accepted  
**Decision:** Build the current client as a React 19 single-page application using Vite and JavaScript.

**Rationale:** The stack supports fast iteration while matching the existing codebase and team constraints.

**Consequences:** New frontend work follows existing JavaScript conventions. A future TypeScript migration requires a separate approved decision and migration plan.

## ADR-003: Use Tailwind CSS and reusable UI primitives

**Status:** Accepted  
**Decision:** Use Tailwind CSS for styling and compose interfaces from controls in `src/components/ui`.

**Rationale:** A shared primitive layer improves consistency, responsiveness, and maintainability without introducing a separate component library.

**Consequences:** New styles use Tailwind utilities; generic controls are added to the UI library only when they have cross-module value.

## ADR-004: Validate forms with React Hook Form and Zod

**Status:** Accepted  
**Decision:** Use React Hook Form for client form state and Zod for client validation schemas.

**Rationale:** The pairing provides performant forms, centralized validation rules, and clear error presentation.

**Consequences:** API validation remains authoritative when Laravel is introduced. Frontend schemas improve usability but do not replace server validation.

## ADR-005: Use contextual toast notifications for user feedback

**Status:** Accepted  
**Decision:** Provide success, error, warning, and info feedback through the React Context-based Toast system.

**Rationale:** Non-blocking, accessible notifications suit routine ERP actions better than browser alerts and maintain a consistent product experience.

**Consequences:** Pages use `useToast`; browser `alert()` must not be added. Toasts are limited to five visible notifications, appear at the top-right, dismiss automatically after four seconds, and can be closed manually.

## ADR-006: Keep Business persistence local until the API is available

**Status:** Accepted, temporary  
**Decision:** The current Business module persists seeded data in browser `localStorage` behind `businessService`.

**Rationale:** This enables frontend workflow development before the Laravel API is ready.

**Consequences:** Local storage is not a production data source. The service boundary will be replaced with Laravel API calls while keeping pages and forms largely unchanged.

## ADR-007: Target Laravel API and MySQL for production data

**Status:** Planned  
**Decision:** Use Laravel as the backend API and MySQL as the relational system of record.

**Rationale:** ERP workflows require authorization, transactional integrity, auditability, validation, and relational reporting.

**Consequences:** Laravel will own authentication, permissions, tenant/business scope, validation, transactions, and audit rules. The frontend communicates only through versioned API contracts.

## ADR-008: Use protected mainline development with short-lived branches

**Status:** Accepted  
**Decision:** Keep `main` deployable and deliver changes through focused short-lived branches and reviewed pull requests.

**Rationale:** This supports predictable releases and makes ERP changes easier to review, test, and roll back.

**Consequences:** Contributors run relevant checks, document verification, and avoid mixing unrelated work in a pull request.

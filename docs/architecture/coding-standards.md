# Coding Standards

Use functional React components and JavaScript. Prefer `async`/`await`; do not introduce promise chains for normal application flow. Use absolute `@/` imports for code outside the current feature when that improves clarity.

Use Tailwind utility classes only for styling. Reuse UI primitives before making module-specific controls. Use Lucide React for icons, meaningful button labels, visible focus states, semantic elements, and `aria-live` for asynchronous feedback.

Forms use React Hook Form with Zod schemas. Validate at the client for fast feedback and repeat validation on the future API. Handle loading, empty, success, and error states explicitly. Use `useToast` for user feedback; do not use `alert`.

Keep functions small, remove dead code, avoid mutation of state, and log unexpected failures only where they help diagnosis. Production secrets, API keys, and environment-specific URLs must not be committed.

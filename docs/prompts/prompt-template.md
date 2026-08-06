# Engineering Prompt Template

```text
Project: BusinessHub ERP
Module: <module name>
Goal: <user outcome>
Scope: <files/behaviour in scope>
Constraints: React 19, JavaScript, Tailwind only, functional components,
feature-based architecture, reuse existing UI, accessible and responsive.
Data: <current source and future API contract>
Acceptance criteria:
- <observable requirement>
- <error/loading/empty behaviour>
- <validation and permissions>
Verification: run lint/build and describe manual checks.
Do not: <explicit exclusions>
```

Provide routes, existing component names, and API examples when known. Keep the request focused on one deliverable so generated changes are reviewable.

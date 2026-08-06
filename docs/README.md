# BusinessHub ERP Documentation

BusinessHub ERP is a multi-business ERP product. The current delivery is a React 19/Vite frontend with a working Business module, dashboard shell, reusable UI library, client-side validation, local browser persistence, and application-wide toast notifications. Laravel and MySQL are planned as the production API and data layer.

## Architecture and stack

The frontend uses a feature-based architecture: domain behaviour belongs under `frontend/src/features`, while reusable controls belong under `frontend/src/components/ui`. React Router renders feature pages inside the dashboard layout. React Hook Form and Zod own form state and validation. Tailwind CSS is the sole styling approach; Lucide provides icons.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Use `npm run build` before merging and `npm run lint` when changing JavaScript.

## Folder map

`frontend/src/features` contains modules; `components/ui` contains shared primitives; `layouts` contains application shells; `routes` owns route definitions; `services` and `api` are integration boundaries; `hooks` and `utils` hold shared behaviour. See [folder structure](architecture/folder-structure.md).

## Development and Git workflow

Work from a short-lived branch, keep changes focused, run checks, open a reviewable pull request, and merge only after approval. Details are in [development workflow](architecture/development-workflow.md) and [branching strategy](architecture/branching-strategy.md).

## Roadmap and contribution

The next product stages are Customers, Inventory, Invoices, Accounting, Reports, authentication, and the Laravel API. Follow the coding, naming, test, and module standards in this documentation. Contributions must preserve module boundaries, include appropriate tests or manual verification evidence, and avoid unrelated refactors.

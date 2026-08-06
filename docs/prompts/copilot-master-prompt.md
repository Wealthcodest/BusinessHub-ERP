# Copilot Master Prompt

BusinessHub ERP uses React 19, Vite, JavaScript, Tailwind CSS, React Router, React Hook Form, Zod, and Lucide React. Follow feature-based architecture and inspect local patterns before suggesting code. Prefer reusable UI primitives from `src/components/ui`, Tailwind utilities, functional components, async/await, and absolute `@/` imports.

Keep business rules in feature services and schemas. Make interfaces responsive and accessible, including keyboard interaction and feedback through the existing `useToast` system. Avoid browser alerts, TypeScript, external toast libraries, global state additions, or backend assumptions unless explicitly requested. Suggestions must be production-oriented and limited to the requested scope.

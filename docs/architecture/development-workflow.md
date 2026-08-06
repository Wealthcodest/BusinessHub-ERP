# Development Workflow

Start with the module specification and inspect nearby UI, route, service, and schema patterns. Define the smallest deliverable, implement within the feature boundary, and add or update its public exports and routes only when required.

For each change: run the application, exercise the affected success/error/empty states, run `npm run lint`, and run `npm run build`. Record manual steps when automated tests do not yet cover the change. Review responsive behaviour and keyboard interaction before opening a pull request.

Use two-week sprints unless the delivery team agrees otherwise. Sprint planning turns roadmap outcomes into testable stories, commits to capacity, and assigns acceptance criteria. Daily work keeps the board current; review demos completed behaviour; retrospective actions are owned in the next sprint.

# Branching Strategy

`main` is the protected, deployable branch. Create short-lived branches from it using one of: `feature/<scope>`, `fix/<scope>`, `chore/<scope>`, or `docs/<scope>`. Example: `feature/customers-list`.

Commit small, cohesive changes with imperative messages such as `Add business delete toast`. Do not mix formatting sweeps, dependency upgrades, and feature work in one pull request. A pull request must describe user impact, testing performed, affected modules, and any migration or configuration need.

Rebase or merge the latest `main` according to team policy before review. Reviewers verify scope, architecture, accessibility, error handling, and checks. Squash merge when individual commits do not provide useful history; never force-push shared protected branches.

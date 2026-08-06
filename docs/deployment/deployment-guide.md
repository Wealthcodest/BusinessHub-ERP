# Deployment Guide

Build the frontend with `cd frontend && npm ci && npm run build`. Deploy the generated `dist` directory to static hosting configured to route SPA paths back to `index.html`. Set API base URLs through environment configuration, never hard-code production endpoints.

The future Laravel deployment must use environment-managed secrets, production cache configuration, database migrations with backup and rollback plans, queues/schedulers where applicable, HTTPS, monitoring, structured logs, and health checks. Release only after staging validation, database compatibility review, and a rollback decision are documented.

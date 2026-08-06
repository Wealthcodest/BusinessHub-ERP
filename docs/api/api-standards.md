# API Standards

Laravel APIs will be versioned under `/api/v1` and use JSON over HTTPS. Use plural resource paths, standard HTTP methods, consistent camelCase request/response fields, ISO 8601 timestamps, and pagination metadata for collections.

Return clear status codes: `200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `422`, and `500` as appropriate. Validation failures should return field-level errors that the frontend can map to React Hook Form. Error responses should include a stable code, human-readable message, and request identifier where available.

Feature services own request calls and translate transport failures into UI-friendly outcomes. Never expose database errors or secrets to clients.

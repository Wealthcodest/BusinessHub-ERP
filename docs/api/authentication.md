# Authentication

Authentication is planned for the Laravel API. The preferred browser approach is secure, HTTP-only session or token cookies with CSRF protection; final selection must be documented before implementation. Passwords are hashed only by Laravel, and every protected endpoint applies authentication plus business membership and role authorization.

The frontend will have an auth boundary, protected routes, a current-user/business context, and predictable handling for expired sessions. Do not store long-lived access tokens in localStorage. Authentication errors should redirect safely to sign-in and preserve only appropriate return paths.

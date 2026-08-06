# Testing Checklist

Before merge, verify the affected route loads, desktop and mobile layouts work, keyboard focus is visible, forms have labels and validation, and loading/empty/error/success states are handled. Confirm toast feedback for user-visible mutations and ensure no browser `alert` is introduced.

Run `npm run lint` and `npm run build`. Manually test create, edit, delete, navigation, invalid inputs, and service failure paths for the Business module. Add unit tests for pure utilities and schemas; add component or integration tests when the test harness is introduced. Future Laravel work requires feature tests for authorization, validation, tenancy, and transactions.

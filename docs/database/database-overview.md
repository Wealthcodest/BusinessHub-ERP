# Database Overview

MySQL is the planned system of record behind a Laravel API. The current browser `localStorage` implementation is temporary development persistence and must not be treated as a migration source without validation.

Every transactional table should have a primary key, business scope where relevant, timestamps, appropriate foreign keys, indexes for common filters, and auditable ownership fields. Choose soft deletion only where business recovery or audit requirements justify it. Store monetary values as fixed-precision decimals, never floating point.

Laravel migrations, seeders, factories, and database tests will be the source-controlled database contract.

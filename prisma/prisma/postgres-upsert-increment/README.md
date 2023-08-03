# PostgreSQL Upsert Increment

This project is a reproducer of a bug in [Prisma](https://github.com/prisma/prisma) which unnecessarily increases the primary key value when using `upsert` on PostgreSQL.
Some signing info records contain an empty address which might point at some serialization issue.

## Steps to Reproduce

1. Create a new database in your PostgreSQL instance
2. Create `.env` file with `DATABASE_URL` variable pointing at your database
3. Run `yarn install`
4. Run `yarn prisma migrate dev`
5. Run `yarn tsx src/index.ts`
6. Look at the `entity` table in the DB and see that values in `id` column are incremented faster than in `slug` column

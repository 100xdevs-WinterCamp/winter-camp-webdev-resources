# Day 02 · Afternoon

**Web Development · 22 October 2026**

Extend the notes API with MongoDB persistence, Mongoose models, and Zod validation.

## Resources

- [Class code](Code/index.js)
- [Beginner assessment · CRUD Assignment](https://brindle-goal-102.notion.site/CRUD-Assignment-40146b36b2e9801c8e59fc9fb217f0c9)
- [Notes · shared with the morning session](https://brindle-goal-102.notion.site/Week-1-Thursday-NOTES-40046b36b2e980f4ba2ae92bbd39dabf)

## Run the class code

Use Node.js 22 or newer. Start your own MongoDB instance or create your own Atlas database first.

From the repository root:

```bash
cd Day-02/02-Afternoon/Code
npm ci
cp .env.example .env
# Set MONGODB_URI in .env to your own database connection string.
node --env-file=.env index.js
```

The example uses `http://localhost:3000`. Stop the morning server first if it is still using that port. The default `.env.example` points to a local database named `winter_camp_notes`.

The upstream hardcoded connection string has been replaced with `process.env.MONGODB_URI`. Never commit your `.env` file.

This remains classroom code: DELETE still targets the old in-memory array, PUT uses a fixed title, and validation does not return immediately after an error response. These are useful follow-up exercises; the imported teaching logic is otherwise preserved.

[Original code](https://github.com/100xwinter-arc/22-oct-2nd-class) · [Day 02](../README.md) · [All days](../../README.md)

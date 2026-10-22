# Day 02 · Morning

**Web Development · 22 October 2026**

Build an Express server and explore CRUD routes with an in-memory notes array.

## Resources

- [Class code](Code/index.js)
- [Notes](https://brindle-goal-102.notion.site/Week-1-Thursday-NOTES-40046b36b2e980f4ba2ae92bbd39dabf)
- [Beginner assessment · CRUD Assignment](https://brindle-goal-102.notion.site/CRUD-Assignment-40146b36b2e9801c8e59fc9fb217f0c9)
- [Advanced assignment · Assignment on CRUD](https://brindle-goal-102.notion.site/Assignment-on-CRUD-38846b36b2e980d2aec3f2299465bc2a)

## Run the class code

From the repository root:

```bash
cd Day-02/01-Morning/Code
npm ci
node index.js
```

The server listens at `http://localhost:3000`. The example routes are `POST /notes`, `GET /notes`, `PUT /notes/:id`, and `DELETE /notes/:id`.

This is the original classroom snapshot. The GET handler sends two responses, and update/delete use array indexes. Use the notes and assessments to understand and improve the implementation. Data resets when the process restarts.

[Original code](https://github.com/100xwinter-arc/22-oct-1st-class) · [Day 02](../README.md) · [All days](../../README.md)

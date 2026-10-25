# Extra Class · Express, Zod & MongoDB

25 October 2026

Class code for a course-selling backend using Bun, Express, MongoDB, Zod, and JWT middleware.

## Resources

- [Class code](Code)
- [Assignment](https://100xdevs.com/playground/javascript?view=problems&module=backend-js-classes-2-3)
- [Notes · Bun, Middleware, JWT, and a Course Selling App](https://brindle-goal-102.notion.site/Class-Notes-Bun-Middleware-JWT-and-a-Course-Selling-App-40346b36b2e9808f8cfbfa05cc09cf7d)
- [AI hackathon for advanced folks](https://brindle-goal-102.notion.site/AI-Hackathon-S30-3-18-Aug-3c046b36b2e980a8890eff3a07ed65a5)

## Run the class code

Install [Bun](https://bun.com), then start your own MongoDB instance or use your own Atlas database.

From the repository root:

```bash
cd Day-02a-Extra-Class/Code
bun install --frozen-lockfile
cp .env.example .env
# Set MONGODB_URL and replace JWT_SECRET with your own long random secret.
bun src/index.js
```

The server listens at `http://localhost:3003`. Keep `.env` private. This project uses `Bun.password`, so run it with Bun.

[Original code](https://github.com/100xwinter-arc/jwt-middleware) · [All resources](../README.md)

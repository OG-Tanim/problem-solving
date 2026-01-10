# Simple Authenticated Todo App on MERN Stack

**Features:**

- Anyone can create todos
- Anyone can see all todos
- Anyone can edit todos (mark as done)

## Implemented So Far:

**Backend:**

- Backend with Express
- Zod validation and sanitization
- Mongoose and mongoDB setup
- 3 APIs - allowing users to create, get and update todos
- Limitations:
  - no Invidiual user Logic to save and update todos
  - no authentication (protected routes)

**Frontend:**

- 2 components:

  - createTodo : hits API to create a new todo with title and description in DB
  - TodoRender : hits API to render all the incoming todos list from DB

- Limitations:
  - fetch keeps making DB calls over and over again
  - Mark a todo as completed not implemeted

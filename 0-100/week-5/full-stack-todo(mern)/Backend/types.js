const zod = require("zod");

const newTodo = zod.object({
  title: zod.string().trim().nonempty(),
  description: zod.string().trim().nonempty(),
}); // removes exrtra fields from safeParsed.data

const updateTodo = zod
  .object({
    id: zod.string().trim().min(1, "can't be empty"), //trim removes leading and trailing spaces and min ensures there is a value
  })
  .strict(); // removes exrtra fields from safeParsed.data

module.exports = {
  newTodo,
  updateTodo,
};

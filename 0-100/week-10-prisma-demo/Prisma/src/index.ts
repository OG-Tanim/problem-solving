import { prisma } from "./lib/prisma";

async function main() {
  // Create a new user with a post
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "Alice3",
  //       email: "alice3@prisma.io",
  //       posts: {
  //         create: {
  //           title: "Hello World 3",
  //           content: "This is my first post! 3",
  //           published: true,
  //         },
  //       },
  //     },
  //     include: {
  //       posts: true,
  //     },
  //   });
  //   console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function updateUser(id: number, email: string, name: string) {
  const res = await prisma.user.update({
    where: { id: id },
    data: { email: email, name: name },
    select: { id: true },
  });
  return res;
}

// updateUser(1, "aliceWondeland@prisma.io", "aliceWonderland")
//   .then(async (r) => {
//     console.log(`user with id ${r} has been updated`);
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.log(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

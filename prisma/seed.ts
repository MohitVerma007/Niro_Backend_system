import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...");

  // Delete child table first
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      name: "Shauvik Yadav",
      email: "shauvik@example.com",
      password: "password123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    },
  });

  await prisma.post.createMany({
    data: [
      {
        title: "Prisma Setup Guide",
        content: "Prisma ORM is amazing!",
        userId: user1.id,
        tags: ""
      },
      {
        title: "Backend Architecture",
        content: "Clean Node.js backend.",
        userId: user1.id,
        tags: ""
      },
      {
        title: "Hello World",
        content: "John's first post.",
        userId: user2.id,
        tags: ""
      },
    ],
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
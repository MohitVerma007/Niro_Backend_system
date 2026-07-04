import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
   migrations: {
        path: "prisma/migrations",  // no need to specify the path if you are using the default path
         seed: "tsx prisma/seed.ts"
    },
  datasource: {
    url: env("DATABASE_URL"), // Ab URL yahan se load hoga
  },
});

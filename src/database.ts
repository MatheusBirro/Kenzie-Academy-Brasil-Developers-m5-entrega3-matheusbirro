import { PrismaClient } from "@prisma/client";

const env = process.env.NODE_ENV

export const prisma = new PrismaClient({
    log: env === "test" ? []: ["query"],
  });
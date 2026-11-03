import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pgPool: Pool | undefined;
};

// Use DIRECT_URL (port 5432, direct session) over DATABASE_URL (port 6543 pgbouncer) to prevent socket timeouts
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!globalForPrisma.pgPool) {
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10000,
  });

  pool.on("error", (err) => {
    console.warn("Unexpected error on idle pg client, recycling socket:", err.message);
  });

  globalForPrisma.pgPool = pool;
}

if (!globalForPrisma.prisma) {
  const adapter = new PrismaPg(globalForPrisma.pgPool);
  globalForPrisma.prisma = new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma;
export const pool = globalForPrisma.pgPool;

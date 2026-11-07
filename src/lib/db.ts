import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pgPool: Pool | undefined;
};

/**
 * Runtime connection string.
 *
 * IMPORTANT: Use the Supabase *transaction-mode* pooler (DATABASE_URL, port 6543) at runtime.
 * The session-mode pooler (DIRECT_URL, port 5432) is hard-capped at `pool_size` (15) total
 * clients, which serverless instances (Vercel) + local dev exhaust instantly, causing
 * "EMAXCONNSESSION max clients reached in session mode".
 *
 * DIRECT_URL is still used by the Prisma CLI (migrate / db push / seed) via prisma.config.ts.
 */
function resolveConnectionString(): string | undefined {
  const raw = process.env.DATABASE_URL || process.env.DIRECT_URL;
  if (!raw) {
    console.error("[db] DATABASE_URL is not set. Database queries will fail.");
    return raw;
  }
  try {
    const url = new URL(raw);
    // `pgbouncer=true` is a Prisma-engine-only flag; node-postgres does not understand it.
    url.searchParams.delete("pgbouncer");
    url.searchParams.delete("connection_limit");

    // Safety net: never use the Supabase SESSION-mode pooler (port 5432, capped at 15 clients)
    // at runtime. Force the TRANSACTION-mode pooler (port 6543) on the same host.
    if (url.hostname.endsWith(".pooler.supabase.com") && url.port !== "6543") {
      console.warn("[db] Runtime URL pointed at Supabase session pooler; switching to transaction pooler (6543).");
      url.port = "6543";
    }
    return url.toString();
  } catch {
    return raw;
  }
}

const isServerless = !!process.env.VERCEL;

if (!globalForPrisma.pgPool) {
  const pool = new Pool({
    connectionString: resolveConnectionString(),
    ssl: { rejectUnauthorized: false },
    // Keep per-instance pools small: on Vercel every lambda instance has its own pool.
    max: isServerless ? 3 : 5,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 15_000,
    keepAlive: true,
    allowExitOnIdle: true,
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

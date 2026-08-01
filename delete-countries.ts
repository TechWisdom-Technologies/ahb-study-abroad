import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Deleting countries from DB...");
  const countriesToDelete = ["South Korea", "Japan", "Italy", "Cyprus", "Belgium"];
  
  const result = await prisma.country.deleteMany({
    where: {
      name: {
        in: countriesToDelete
      }
    }
  });

  console.log(`Deleted ${result.count} countries.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

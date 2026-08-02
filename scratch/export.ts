import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Exporting local data...");
  const data = {
    countries: await prisma.country.findMany(),
    universities: await prisma.university.findMany(),
    englishTests: await prisma.englishTest.findMany(),
    scholarships: await prisma.scholarship.findMany(),
    testimonials: await prisma.testimonial.findMany(),
    announcements: await prisma.announcement.findMany(),
    leads: await prisma.lead.findMany(),
    users: await prisma.user.findMany(),
    userRoles: await prisma.userRole.findMany(),
    visaApprovals: await prisma.visaApproval.findMany(),
  };
  fs.writeFileSync('g:/TECHWISDOM/Clients/ahb-education/scratch/exported-data.json', JSON.stringify(data, null, 2));
  console.log("Export complete! Total records:", Object.values(data).reduce((acc, val) => acc + val.length, 0));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

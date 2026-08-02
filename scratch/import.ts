import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import fs from 'fs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Reading exported data...");
  const raw = fs.readFileSync('g:/TECHWISDOM/Clients/ahb-education/scratch/exported-data.json', 'utf8');
  const data = JSON.parse(raw);

  console.log("Importing into Supabase...");
  
  // Insert in order of relations to prevent foreign key errors
  if (data.users.length) await prisma.user.createMany({ data: data.users, skipDuplicates: true });
  if (data.countries.length) await prisma.country.createMany({ data: data.countries, skipDuplicates: true });
  if (data.englishTests.length) await prisma.englishTest.createMany({ data: data.englishTests, skipDuplicates: true });
  if (data.testimonials.length) await prisma.testimonial.createMany({ data: data.testimonials, skipDuplicates: true });
  if (data.announcements.length) await prisma.announcement.createMany({ data: data.announcements, skipDuplicates: true });
  if (data.leads.length) await prisma.lead.createMany({ data: data.leads, skipDuplicates: true });
  if (data.visaApprovals.length) await prisma.visaApproval.createMany({ data: data.visaApprovals, skipDuplicates: true });
  
  if (data.universities.length) await prisma.university.createMany({ data: data.universities, skipDuplicates: true });
  if (data.userRoles.length) await prisma.userRole.createMany({ data: data.userRoles, skipDuplicates: true });
  if (data.scholarships.length) await prisma.scholarship.createMany({ data: data.scholarships, skipDuplicates: true });

  console.log("Import complete! Your Supabase database is now populated.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

import "dotenv/config";
import { PrismaClient, AppRole } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from 'bcryptjs';
import { destinationData } from '../src/data/destinationDetails';
import universityListData from '../src/data/universityListData.json';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database for AHB Study Abroad...");

  // 1. Create Default Admin Users
  const hashedPassword = await bcrypt.hash("AdminPassword123!", 10);

  const adminEmails = ["admin@ahbstudy.com"];
  for (const adminEmail of adminEmails) {
    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: { password: hashedPassword },
      create: {
        email: adminEmail,
        password: hashedPassword,
        roles: {
          create: {
            role: AppRole.ADMIN
          }
        }
      }
    });
    console.log(`Admin user registered: ${adminUser.email}`);
  }

  // 2. Clear existing Universities in Database as requested
  console.log("Clearing existing university records from database...");
  await prisma.university.deleteMany({});
  console.log("Cleared all existing university entries.");

  // 3. Sync Countries from destinationDetails & universityListData
  let sortOrder = 0;

  // First, process all destinations in destinationData
  for (const [slug, info] of Object.entries(destinationData)) {
    await prisma.country.upsert({
      where: { name: info.name },
      update: {
        flagCode: info.flagCode,
        description: info.description,
        sortOrder: sortOrder++,
        isActive: true,
        tagline: info.tagline,
        highlights: info.highlights as any,
        whyChoose: info.whyChoose as any,
        expenseRange: info.tuitionRange,
        livingCost: info.livingCost,
        popularCourses: info.popularCourses as any,
        workRights: info.workRights,
        intakes: info.intakes as any,
        visaInfo: info.visaInfo,
        englishRequirements: info.englishRequirements as any,
        tuitionDetails: info.tuitionDetails as any,
        documentChecklist: info.documentChecklist as any,
        specialNotes: info.specialNotes as any,
      },
      create: {
        name: info.name,
        flagCode: info.flagCode,
        description: info.description,
        sortOrder: sortOrder++,
        isActive: true,
        tagline: info.tagline,
        highlights: info.highlights as any,
        whyChoose: info.whyChoose as any,
        expenseRange: info.tuitionRange,
        livingCost: info.livingCost,
        popularCourses: info.popularCourses as any,
        workRights: info.workRights,
        intakes: info.intakes as any,
        visaInfo: info.visaInfo,
        englishRequirements: info.englishRequirements as any,
        tuitionDetails: info.tuitionDetails as any,
        documentChecklist: info.documentChecklist as any,
        specialNotes: info.specialNotes as any,
      }
    });
  }

  // Next, process countries and universities from universityListData.json (docX file)
  const docData = universityListData as Record<string, { name: string; flagCode: string; slug: string; universities: string[] }>;

  for (const [slug, item] of Object.entries(docData)) {
    const country = await prisma.country.upsert({
      where: { name: item.name },
      update: {
        flagCode: item.flagCode,
        isActive: true,
      },
      create: {
        name: item.name,
        flagCode: item.flagCode,
        description: `Study in ${item.name} with AHB Study Abroad. Full admission and visa guidance available.`,
        sortOrder: sortOrder++,
        isActive: true,
        tagline: `Top study destination: ${item.name}`,
      }
    });

    console.log(`Syncing ${item.universities.length} universities for ${country.name}...`);

    for (const uniName of item.universities) {
      await prisma.university.create({
        data: {
          countryId: country.id,
          name: uniName,
          isPartner: true,
          isActive: true,
          scholarshipAvailable: false,
        }
      });
    }

    // Update universityCount on country
    const totalCount = await prisma.university.count({
      where: { countryId: country.id }
    });

    await prisma.country.update({
      where: { id: country.id },
      data: { universityCount: totalCount }
    });
  }

  console.log("Seeding complete! All universities from docx successfully inserted.");
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

import "dotenv/config";
import { PrismaClient, AppRole } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from 'bcryptjs';
import { destinationData } from '../src/data/destinationDetails';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // 1. Create Default Admin User
  const adminEmail = "admin@cambry.com";
  const hashedPassword = await bcrypt.hash("AdminPassword123!", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
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

  // 2. Import Destinations Data
  let sortOrder = 0;
  for (const [slug, info] of Object.entries(destinationData)) {
    const country = await prisma.country.upsert({
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
        universityCount: (info.universities?.length || 0) + (info.partnerInstitutions?.length || 0),
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
        universityCount: (info.universities?.length || 0) + (info.partnerInstitutions?.length || 0),
      }
    });
    console.log(`Synced country: ${country.name}`);

    // Process Universities
    if (info.universities) {
      for (const uni of info.universities) {
        // Avoid duplicate university insert in seed
        const existingUni = await prisma.university.findFirst({
          where: { name: uni.name, countryId: country.id }
        });
        if (!existingUni) {
          await prisma.university.create({
            data: {
              countryId: country.id,
              name: uni.name,
              websiteUrl: uni.url,
              isPartner: false,
              isActive: true,
              scholarshipAvailable: false,
            }
          });
        }
      }
    }

    if (info.partnerInstitutions) {
      for (const partner of info.partnerInstitutions) {
        const existingUni = await prisma.university.findFirst({
          where: { name: partner.name, countryId: country.id }
        });
        if (!existingUni) {
          await prisma.university.create({
            data: {
              countryId: country.id,
              name: partner.name,
              websiteUrl: partner.url,
              tuitionFeeRange: partner.offerTime,
              isPartner: true,
              isActive: true,
              scholarshipAvailable: !!partner.scholarship,
            }
          });
        }
      }
    }
  }
  
  console.log("Seeding complete!");
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

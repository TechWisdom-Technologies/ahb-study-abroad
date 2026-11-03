import { prisma } from "../src/lib/db";

async function main() {
  console.log("Seeding realistic Announcements and Visa Approvals into database...");

  // 1. Delete test gibberish data if present
  await prisma.announcement.deleteMany({
    where: {
      text: { in: ["tjsrfxdkmxcjmkytx", "test"] },
    },
  });

  await prisma.visaApproval.deleteMany({
    where: {
      studentName: { in: ["dfgh", "test"] },
    },
  });

  // 2. Insert Announcements
  const announcementsData = [
    {
      text: "🎓 Upcoming September 2026 Intakes for UK, Canada & Australia - Applications are now open!",
      linkUrl: "/destinations",
      linkText: "Apply Now",
      isActive: true,
      sortOrder: 1,
    },
    {
      text: "📢 Free 1-on-1 IELTS & Study Abroad Profile Assessment with our Senior Counselors",
      linkUrl: "/contact",
      linkText: "Book Free Session",
      isActive: true,
      sortOrder: 2,
    },
    {
      text: "🇨🇦 Canada Study Permit processing guidance: SDS & Non-SDS application support available",
      linkUrl: "/destinations/canada",
      linkText: "Learn More",
      isActive: true,
      sortOrder: 3,
    },
    {
      text: "🇬🇧 Fast-track CAS processing & UK Student Visa interview prep sessions every week",
      linkUrl: "/destinations/uk",
      linkText: "View UK Info",
      isActive: true,
      sortOrder: 4,
    },
    {
      text: "🇦🇺 High visa grant rates for Australian Master's & Bachelor's programs",
      linkUrl: "/destinations/australia",
      linkText: "Explore Australia",
      isActive: true,
      sortOrder: 5,
    },
    {
      text: "🏆 Up to 100% merit-based scholarships available for international students",
      linkUrl: "/scholarships",
      linkText: "Check Scholarships",
      isActive: true,
      sortOrder: 6,
    },
  ];

  for (const item of announcementsData) {
    await prisma.announcement.create({
      data: item,
    });
  }
  console.log(`Inserted ${announcementsData.length} announcements.`);

  // 3. Insert Visa Approvals
  const visaApprovalsData = [
    {
      studentName: "Tanvir Hasan",
      country: "United Kingdom",
      visaType: "Tier 4 Student Visa (BSc Computer Science)",
      flagUrl: "/flags/gb.svg",
      isActive: true,
      sortOrder: 1,
    },
    {
      studentName: "Nusrat Jahan Chowdhury",
      country: "Canada",
      visaType: "Study Permit (MBA - University of Toronto)",
      flagUrl: "/flags/ca.svg",
      isActive: true,
      sortOrder: 2,
    },
    {
      studentName: "Mahmudul Haque",
      country: "Australia",
      visaType: "Subclass 500 Visa (Master of IT)",
      flagUrl: "/flags/au.svg",
      isActive: true,
      sortOrder: 3,
    },
    {
      studentName: "Farzana Akter",
      country: "United States",
      visaType: "F-1 Student Visa (MS Data Science)",
      flagUrl: "/flags/us.svg",
      isActive: true,
      sortOrder: 4,
    },
    {
      studentName: "Shahidul Islam",
      country: "Germany",
      visaType: "National Visa D (MSc Automotive)",
      flagUrl: "/flags/de.svg",
      isActive: true,
      sortOrder: 5,
    },
    {
      studentName: "Sabbir Rahman",
      country: "Ireland",
      visaType: "Study Visa - Stamp 2 (MSc Finance)",
      flagUrl: "/flags/ie.svg",
      isActive: true,
      sortOrder: 6,
    },
    {
      studentName: "Mehedi Hasan",
      country: "Malaysia",
      visaType: "Student Pass VAL (Universiti Malaya)",
      flagUrl: "/flags/my.svg",
      isActive: true,
      sortOrder: 7,
    },
    {
      studentName: "Ayesha Siddiqua",
      country: "China",
      visaType: "X1 Student Visa (MBBS Clinical Medicine)",
      flagUrl: "/flags/cn.svg",
      isActive: true,
      sortOrder: 8,
    },
  ];

  for (const item of visaApprovalsData) {
    await prisma.visaApproval.create({
      data: item,
    });
  }
  console.log(`Inserted ${visaApprovalsData.length} visa approvals.`);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


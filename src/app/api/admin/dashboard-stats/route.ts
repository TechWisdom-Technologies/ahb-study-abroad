import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  const decoded = verifyToken(token);
  if (!decoded) return null;
  return decoded;
}

export async function GET() {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      countriesCount,
      universitiesCount,
      englishTestsCount,
      scholarshipsCount,
      testimonialsCount,
      announcementsCount,
      leadsCount,
      recentLeads,
      allLeads,
    ] = await Promise.all([
      prisma.country.count(),
      prisma.university.count(),
      prisma.englishTest.count(),
      prisma.scholarship.count(),
      prisma.testimonial.count(),
      prisma.announcement.count(),
      prisma.lead.count(),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.lead.findMany({
        select: { status: true },
      }),
    ]);

    const leadStats = { new: 0, contacted: 0, converted: 0, closed: 0 };
    allLeads.forEach((l: any) => {
      const status = l.status as keyof typeof leadStats;
      if (leadStats[status] !== undefined) {
        leadStats[status]++;
      }
    });

    const mappedRecentLeads = recentLeads.map((l: any) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      status: l.status,
      destination: l.destination,
      created_at: l.createdAt.toISOString(),
    }));

    return NextResponse.json({
      counts: {
        countries: countriesCount,
        universities: universitiesCount,
        english_tests: englishTestsCount,
        scholarships: scholarshipsCount,
        testimonials: testimonialsCount,
        announcements: announcementsCount,
        leads: leadsCount,
      },
      recentLeads: mappedRecentLeads,
      leadStats,
    });
  } catch (error: any) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

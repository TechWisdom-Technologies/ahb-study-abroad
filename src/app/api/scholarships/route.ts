import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const scholarships = await prisma.scholarship.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      include: {
        country: {
          select: {
            name: true,
            flagCode: true,
          },
        },
      },
    });
    return NextResponse.json(scholarships);
  } catch (error) {
    console.error("Failed to fetch scholarships:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

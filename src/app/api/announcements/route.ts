import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        text: true,
        linkUrl: true,
      },
    });
    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Failed to fetch announcements:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

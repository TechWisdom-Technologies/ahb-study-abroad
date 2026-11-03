import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const approvals = await prisma.visaApproval.findMany({
      where: { isActive: true },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
      select: {
        id: true,
        studentName: true,
        country: true,
        visaType: true,
        flagUrl: true,
        createdAt: true,
      },
    });
    return NextResponse.json(approvals);
  } catch (error) {
    console.error("Failed to fetch visa approvals:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


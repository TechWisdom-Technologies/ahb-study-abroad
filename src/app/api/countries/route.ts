import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(countries);
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

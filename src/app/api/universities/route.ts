import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryId = searchParams.get("countryId");

    const where: any = { isActive: true };
    if (countryId) {
      where.countryId = countryId;
    }

    const universities = await prisma.university.findMany({
      where,
      orderBy: { name: "asc" },
    });
    return NextResponse.json(universities);
  } catch (error) {
    console.error("Failed to fetch universities:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const tests = await prisma.englishTest.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(tests);
  } catch (error) {
    console.error("Failed to fetch english tests:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

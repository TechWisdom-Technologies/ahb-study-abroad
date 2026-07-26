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

const tableToModelMap: Record<string, string> = {
  countries: "country",
  universities: "university",
  english_tests: "englishTest",
  scholarships: "scholarship",
  testimonials: "testimonial",
  announcements: "announcement",
  visa_approvals: "visaApproval",
  leads: "lead",
};

function getPrismaModel(table: string) {
  const modelName = tableToModelMap[table];
  if (!modelName) return null;
  return (prisma as any)[modelName];
}

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function snakeToCamelObject(obj: any): any {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(snakeToCamelObject);

  const newObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[toCamelCase(key)] = snakeToCamelObject(obj[key]);
    }
  }
  return newObj;
}

function camelToSnakeObject(obj: any): any {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(camelToSnakeObject);

  const newObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[toSnakeCase(key)] = camelToSnakeObject(obj[key]);
    }
  }
  return newObj;
}

export async function GET(request: Request, { params }: { params: Promise<{ table: string }> }) {
  try {
    const { table } = await params;
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const model = getPrismaModel(table);
    if (!model) return NextResponse.json({ error: "Table not found" }, { status: 404 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const item = await model.findUnique({ where: { id } });
      if (!item) return NextResponse.json({ error: "Record not found" }, { status: 404 });
      return NextResponse.json(camelToSnakeObject(item));
    }

    const items = await model.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(camelToSnakeObject(items));
  } catch (error: any) {
    console.error("GET error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ table: string }> }) {
  try {
    const { table } = await params;
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const model = getPrismaModel(table);
    if (!model) return NextResponse.json({ error: "Table not found" }, { status: 404 });

    const body = await request.json();
    const data = snakeToCamelObject(body);

    if (Array.isArray(data)) {
      const created = await model.createMany({ data });
      return NextResponse.json({ success: true, count: created.count });
    } else {
      const created = await model.create({ data });
      return NextResponse.json(camelToSnakeObject(created));
    }
  } catch (error: any) {
    console.error("POST error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ table: string }> }) {
  try {
    const { table } = await params;
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const model = getPrismaModel(table);
    if (!model) return NextResponse.json({ error: "Table not found" }, { status: 404 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    const data = snakeToCamelObject(body);

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;

    const updated = await model.update({
      where: { id },
      data,
    });
    return NextResponse.json(camelToSnakeObject(updated));
  } catch (error: any) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ table: string }> }) {
  try {
    const { table } = await params;
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const model = getPrismaModel(table);
    if (!model) return NextResponse.json({ error: "Table not found" }, { status: 404 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const idsString = searchParams.get("ids");

    if (id) {
      await model.delete({ where: { id } });
      return NextResponse.json({ success: true });
    } else if (idsString) {
      const ids = idsString.split(",");
      await model.deleteMany({
        where: {
          id: { in: ids },
        },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Missing ID or IDs" }, { status: 400 });
  } catch (error: any) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

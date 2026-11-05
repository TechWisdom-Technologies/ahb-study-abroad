import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";
import { AppRole } from "@prisma/client";

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: npm run create-user <email> <password>");
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (existing) {
    console.error(`User with email "${email}" already exists!`);
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      roles: {
        create: {
          role: AppRole.ADMIN,
        },
      },
    },
    include: {
      roles: true,
    },
  });

  console.log(`\n✅ Admin user created successfully:`);
  console.log(`Email: ${user.email}`);
  console.log(`Role:  ${user.roles.map((r: any) => r.role).join(", ")}\n`);
}

main()
  .catch((e) => {
    console.error("Failed to create user:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


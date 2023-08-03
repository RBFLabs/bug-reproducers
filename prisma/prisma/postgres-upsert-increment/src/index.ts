import { PrismaClient } from "@prisma/client";

(async () => {
  const prisma = new PrismaClient();

  const entities = ["1"];

  for (let i = 0; i < 100; i++) {
    console.log(`Upserting ${entities.length} entities...`);
    await prisma.$transaction(
      entities.map((slug) =>
        prisma.entity.upsert({
          create: { slug },
          update: { slug },
          where: { slug },
        })
      )
    );

    const lastEntity = entities[entities.length - 1];
    entities.push(String(Number(lastEntity) + 1));
  }
})();

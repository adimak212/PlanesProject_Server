import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAll(req, res){
  const page  = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = 15;                         // fixed page size
  const skip  = (page - 1) * limit;

  try {
    const items = await prisma.plane.findMany({
      skip,
      take: limit,
      orderBy: { id: "asc" },
    });

    // Look ahead to see if there are more rows
    const total = await prisma.plane.count();
    const hasMore = skip + items.length < total;

    res.status(200).json({ items, hasMore });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
};

import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
const prisma = new PrismaClient();

export async function deleteById(req : Request, res : Response) {
  try {          
    await prisma.plane.delete({ where: { id: Number(req.query.id) } });
    return res.sendStatus(204).send();        // No Content
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete" });
  }
}
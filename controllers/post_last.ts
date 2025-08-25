import type { Request, Response } from "express";
const path = require("path");
const {PrismaClient} = require("@prisma/client");
const fs = require("fs/promises");
const fsRegular = require("fs")
const prisma = new PrismaClient();
type MulterRequest = Request & { file?: Express.Multer.File };  

async function ensureDir(dir: string) {
  if (!fsRegular.existsSync(dir)) {
    await fs.mkdir(dir, { recursive: true });
  }
}

export async function post(req: MulterRequest, res: Response) {
  try {
    // Validate file presence
    const image = req.file;
    if (!image) {
      return res.status(400).json({ error: "file is required (field name: 'file')" });
    }

    const { name, country, year } = req.body ?? {};
    if (!name || !country || !year) {
      return res.status(400).json({ error: "name, country, and year are required" });
    }

    const uploadsDir = path.join(process.cwd(), "uploads");
    await ensureDir(uploadsDir);

    const filename = `${name}_${country}_${year}.png`;
    const destPath = path.join(uploadsDir, filename);

    if (!image.buffer) {
      return res.status(500).json({
        error:
          "No file buffer found. Are you using multer.memoryStorage()? If using diskStorage(), don't write the file manually."
      });
    }

    // Write the file
    await fs.writeFile(destPath, image.buffer);

    await prisma.plane.create({
      data: {
        name: String(name),
        year: Number(year),
        country: String(country),
        img_url: filename
      }
    });

    // Respond with a URL the client can use directly in <img src=...>
    return res.status(200).json({
      filename,
      url: `/uploads/${filename}`
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(message);
    return res.status(500).json({ error: message });
  }
}

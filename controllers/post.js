import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function post(req, res) {
    try {
        await prisma.plane.create({ data: req.body });
        return res.status(200).send();
    } catch (error) {
        console.log(error.message);
        return res.status(500).send();
    }
}

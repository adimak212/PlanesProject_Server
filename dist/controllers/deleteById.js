"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = deleteById;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function deleteById(req, res) {
    try {
        await prisma.plane.delete({ where: { id: Number(req.query.id) } });
        return res.sendStatus(204).send(); // No Content
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete" });
    }
}
//# sourceMappingURL=deleteById.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getAll(req, res) {
    // normalize page to a single string or undefined
    const raw = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page;
    const pageNum = (() => {
        const n = parseInt(raw ?? "1", 10);
        return Number.isNaN(n) || n < 1 ? 1 : n;
    })();
    const limit = 15;
    const skip = (pageNum - 1) * limit;
    try {
        const items = await prisma.plane.findMany({
            skip,
            take: limit,
            orderBy: { id: "asc" },
        });
        const total = await prisma.plane.count();
        const hasMore = skip + items.length < total;
        res.status(200).json({ items, hasMore, page: pageNum });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server error" });
    }
}
//# sourceMappingURL=getAll.js.map
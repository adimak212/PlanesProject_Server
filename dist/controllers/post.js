"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = post;
const prisma = new PrismaClient();
async function post(req, res) {
    const image = req.file;
    //console.log(req.file);
    const folder = path.join(process.cwd(), "uploads");
    const imagePath = path.join(folder, `${req.body.name}_${req.body.country}_${req.body.year}.png`);
    const isExists = fsRegular.existsSync(folder);
    if (!isExists)
        await fs.mkdir(folder, { recursive: true });
    await fs.writeFile(imagePath, image.buffer);
    try {
        //console.log(req.body);
        await prisma.plane.create({
            data: {
                name: req.body.name,
                year: Number(req.body.year),
                country: req.body.country,
                img_url: `${req.body.name}_${req.body.country}_${req.body.year}.png`,
            },
        });
        return res.status(200).send();
    }
    catch (error) { }
    ;
    Error;
    {
        console.log(error.message);
        return res.status(500).send();
    }
}
//# sourceMappingURL=post.js.map
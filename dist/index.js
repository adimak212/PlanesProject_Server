"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_2 = __importDefault(require("express"));
//import cors from "cors";
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
//import { router } from "./routers/index.js";
const router = require("./routers/index.js");
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
const app = (0, express_2.default)();
app.use(cors(corsOptions));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/api", router);
app.use("/uploads", express_2.default.static(path_1.default.join(__dirname, "uploads"), {
    // optional nice-to-haves:
    maxAge: "7d", // cache images for a week
    extensions: ["png", "jpg", "jpeg", "gif", "webp"],
}));
app.listen(3000, () => { });
//# sourceMappingURL=index.js.map
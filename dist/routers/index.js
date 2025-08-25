"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const post_js_1 = require("../controllers/post.js");
const getAll_js_1 = require("../controllers/getAll.js");
const deleteById_js_1 = require("../controllers/deleteById.js");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.router = express_1.default.Router();
exports.router.post("/post", upload.single("file"), post_js_1.post);
exports.router.get("/getAll", getAll_js_1.getAll);
exports.router.delete("/deleteById", deleteById_js_1.deleteById);
//# sourceMappingURL=index.js.map
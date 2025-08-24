import express from "express";
import { post } from "../controllers/post.js";
import { getAll } from "../controllers/getAll.js";
import { deleteById } from "../controllers/deleteById.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

export const router = express.Router();

router.post("/post", upload.single("file"), post);
router.get("/getAll", getAll);
router.delete("/deleteById", deleteById);

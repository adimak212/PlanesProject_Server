import express from "express";
import {post} from "../controllers/post.js"
import { getAll } from "../controllers/getAll.js";
import { deleteById } from "../controllers/deleteById.js";


export const router = express.Router();

router.post("/post" , post);
router.get("/getAll" , getAll);
router.delete("/deleteById" , deleteById);
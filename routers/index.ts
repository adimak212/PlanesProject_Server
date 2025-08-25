// routers/index.js (or .ts with CJS style)
const express = require("express");
const multer = require("multer");
const { post } = require("../controllers/post_last");
const { getAll } = require("../controllers/getAll");
const { deleteById } = require("../controllers/deleteById");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
router.post("/post", upload.single("file"), post);
router.get("/getAll", getAll);
router.delete("/deleteById", deleteById);

module.exports = router;


import express from "express";
import path from "path";

const cors = require("cors");
const router = require("./routers/index");
const app = express();

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

app.use("/api", router);
app.use(
  "/uploads",
  express.static(UPLOADS_DIR, {
    maxAge: "7d",
    extensions: ["png", "jpg", "jpeg", "gif", "webp"],
  })
);

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});

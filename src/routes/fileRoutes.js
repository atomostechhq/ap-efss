import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import { uploadFile, getFile } from "../controllers/fileController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload", authenticate, upload.single("file"), uploadFile);
router.get("/:company/:contentType/:fileName", getFile);

export default router;

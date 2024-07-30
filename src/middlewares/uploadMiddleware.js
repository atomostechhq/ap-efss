import multer from "multer";
import { getUploadPath } from "../utils/dirUtils.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { company, contentType } = req.body;
    const uploadDir = getUploadPath(company, contentType, "");
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const { filename } = req.body;
    cb(null, filename || file.originalname);
  },
});

export const upload = multer({ storage });

import fs from "fs";
import path from "path";

export const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

export const getUploadPath = (company, contentType, fileName) => {
  const uploadDir = process.env.UPLOAD_DIR || "uploads";
  const dirPath = path.join(uploadDir, company, contentType);
  createDir(dirPath);
  return path.join(dirPath, fileName);
};

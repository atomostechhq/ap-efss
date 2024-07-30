import path from "path";
import { getUploadPath } from "../utils/dirUtils.js";

export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
};

export const getFile = (req, res) => {
  const { company, contentType, fileName } = req.params;
  const filePath = getUploadPath(company, contentType, fileName);

  res.sendFile(path.resolve(filePath));
};

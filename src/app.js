import dotenv from "dotenv";
import express from "express";
import path from "path";
import fileRoutes from "./routes/fileRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import logger from "./config/logger.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/files", fileRoutes);

const uploadDir = process.env.UPLOAD_DIR || "uploads";
app.use(`/${uploadDir}`, express.static(path.join(path.resolve(), uploadDir)));

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

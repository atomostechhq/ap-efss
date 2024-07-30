import asyncHandler from "express-async-handler";

export const authenticate = asyncHandler((req, res, next) => {
  const apiKey = req.header("x-api-key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401);
    throw new Error("Not authorized, invalid API key");
  }
  next();
});

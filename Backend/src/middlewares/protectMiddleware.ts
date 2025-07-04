import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/JWt";

export const protectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.user;

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const validToken = verifyToken(token);

    if (!validToken || typeof validToken !== "string") {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    req.user = validToken;
    next();
  } catch (err) {
    console.log(
      "Error in protectMiddleware in protectMiddleware.ts file : ",
      err,
    );
    res.status(500).json("Internal sever error!");
    return;
  }
};

import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/JWt";

export const protectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      console.log(req.user);
      return;
    }

    const token: string = await req.cookies["user"];

    console.log("token", token);
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

    if (!req.user || req.user !== undefined) {
      res.status(401).json({ error: "Unauthorized!" });
      return;
    }

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

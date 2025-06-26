import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

import mongoConnect from "./connection";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const app = express();

const PORT = process.env.PORT || 8000;

app.get("*", (req: Request, res: Response) => {
  console.log("No such api found", req.url);
  res.status(404).json({ error: "No such api found!" });
});

app.listen(PORT, () => {
  mongoConnect();
  console.log("App listening on PORT : ", PORT);
});

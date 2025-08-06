import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import mongoConnect from "./connection";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRouter";
import settingsRouter from "./routers/settingRouter";
import { isValidAddress } from "./services/openCage";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use("/api", authRouter);
app.use("/api/settings", settingsRouter);

app.get("*", (req: Request, res: Response) => {
  console.log("No such api found", req.url);
  res.status(404).json({ error: "No such api found!" });
});

app.listen(PORT, () => {
  mongoConnect();
  console.log("App listening on PORT : ", PORT);
});

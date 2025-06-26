import { Response, Request } from "express";

const signup = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (err) {
    console.log("Error in signup controller in authRoutes.ts file", err);
    res.status(500).json({ error: "Internal server error!" });
    return;
  }
};

const signin = async (req: Request, res: Response): Promise<void> => {
  try {
  } catch (err) {
    console.log("Error in signin controller in authRoutes.ts file", err);
    res.status(500).json({ error: "Internal server error!" });
    return;
  }
};

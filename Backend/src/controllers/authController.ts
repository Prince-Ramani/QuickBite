import { Response, Request } from "express";
import { userInterface } from "../types/user";
import { hashPassword, validatePasswordStrength } from "../services/password";
import { validateEmail } from "../services/email";
import User from "../models/userModel";

const phoneRegex = /^\d{10}$/;

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      username,
      email,
      password,
      phoneNumber,
      profilePicture,
    }: userInterface = req.body;

    if (
      !username ||
      username.trim().length < 3 ||
      username.trim().length > 12
    ) {
      res
        .status(400)
        .json({ error: "A username must be between 3 and 12 characters!" });
      return;
    }

    if (!password) {
      res.status(400).json({ error: "Password required." });
      return;
    }

    const validPassword = validatePasswordStrength(password);

    if (validPassword.valid === false) {
      res.status(400).json({ error: validPassword.message });
      return;
    }

    if (!email) {
      res.status(400).json({ error: "Email required." });
      return;
    }

    const validEmail = validateEmail(email);

    if (!validEmail) {
      res.status(400).json({ error: "Invalid email format." });
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      res
        .status(400)
        .json({ error: "Phone number must be exactly 10 digits." });
      return;
    }
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePicture,
    });
    await newUser.save();

    res.status(202).json({ message: "Account created successfully." });
    return;
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

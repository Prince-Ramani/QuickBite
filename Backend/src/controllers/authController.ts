import { Response, Request } from "express";
import { userInterface } from "../types/user";
import {
  hashPassword,
  validatePasswordStrength,
  verfiyPassword,
} from "../services/password";
import { validateEmail } from "../services/email";
import User from "../models/userModel";
import { createToken, verifyToken } from "../services/JWt";
import { error } from "console";
import { sendWelcomeMail } from "../services/nodemailer";

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
        .json({ error: "A username must be between 3 to 12 characters!" });
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

    if (!phoneNumber) {
      res.status(400).json({ error: "Phone number required." });
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      res
        .status(400)
        .json({ error: "Phone number must be exactly 10 digits." });
      return;
    }

    const emailAlreadyRegistered = await User.exists({ email }).lean();

    if (emailAlreadyRegistered) {
      res.status(400).json({ error: "Account with this email alredy exists!" });
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

    await sendWelcomeMail({
      to: newUser.email,
      username: newUser.username,
    });

    const token = createToken(newUser._id.toString());

    res.cookie("user", token, {
      maxAge: 1000 * 60 * 60,
    });

    res.status(202).json({ message: "Account created successfully." });
    return;
  } catch (err) {
    console.log("Error in signup controller in authController.ts file", err);
    res.status(500).json({ error: "Internal server error!" });
    return;
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email required!" });
      return;
    }

    if (!password) {
      res.status(400).json({ error: "Password required!" });
      return;
    }

    const validEmail = validateEmail(email);

    if (!validEmail) {
      res.status(400).json({ error: "Invalid email format." });
      return;
    }

    const person = await User.findOne({ email });

    if (!person) {
      res
        .status(404)
        .json({ error: "Account with this email is not registered." });
      return;
    }

    const validPassword = await verfiyPassword(password, person.password);

    if (!validPassword) {
      res.status(400).json({ error: "Incorrect password." });
      return;
      Number;
    }

    const token = createToken(person._id.toString());

    res.cookie("user", token, {
      maxAge: 60 * 60 * 60,
    });

    res.status(200).json({ message: "Loggedin successfully." });
    return;
  } catch (err) {
    console.log("Error in signin controller in authController.ts file", err);
    res.status(500).json({ error: "Internal server error!" });
    return;
  }
};

export const logout = async (_: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("user");
    res.status(200).json({ message: "Logout successfull" });
  } catch (err) {
    console.log("Error in logout controller in authController.ts file", err);
    res.status(500).json({ error: "Internal server error!" });
    return;
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userID = req.user;

    if (!userID) {
      res.status(401).json({ error: "Cookies not found!" });
      return;
    }

    const person = await User.findById(userID)
      .select("-password -phoneNumber")
      .lean();

    if (!person) {
      res.status(400).json({ error: "No such account such account found!" });
      return;
    }

    res.status(200).json(person);
    return;
  } catch (err) {
    console.log("Error in getMe controller in authController.ts file", err);
    res.status(500).json({ error: "Internal server error!" });
    return;
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { user: userID } = req.cookies;

    if (!userID) {
      res.status(401).json({ error: "Cookies not found!" });
      return;
    }

    const person = await User.findById(userID);

    if (!person) {
      res.status(401).json({ error: "No such account found!" });
      return;
    }

    //not tested yet

    //otp logic
  } catch (err) {
    console.log(
      "Error in deleteAccount controller in authController.ts file",
      err,
    );
    res.status(500).json({ error: "Internal sever error!" });
    return;
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

export interface userInterface {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
}

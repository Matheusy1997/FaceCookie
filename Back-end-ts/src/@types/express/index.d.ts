import { JwtPayload } from "jsonwebtoken";

export interface UserJwtPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: UserJwtPayload;
    }
  }
}
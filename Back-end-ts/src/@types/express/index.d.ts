import { JwtPayload } from "jsonwebtoken";

export interface UserJwtPayload extends JwtPayload {
  id: number;
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
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.CHAVE_SECRETA || "";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log("Chave Secreta sendo usada:", secretKey);

  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Token de autenticação não fornecido." });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Token inválido ou expirado." });

      req.user = user as { id: string; email: string; name: string };
      next();
  });
};

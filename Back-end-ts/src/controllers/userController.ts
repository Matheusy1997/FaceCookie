import { Request, Response } from "express";
import { isValidEmail, isValidPassword } from "../utils/validationUtils";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../utils/authUtils";
import { findByEmail, create, currentDelee, update } from "../models/userModel";
import jwt from "jsonwebtoken";

const secretKey = process.env.CHAVE_SECRETA || "";
export const getUser = async (req: Request, res: Response) => {
  const { emaill } = req.params;

  if (!isValidEmail(emaill))
    return res.status(400).json({ message: "E-mail inválido." });
  try {
    const user = findByEmail(emaill);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!isValidEmail(email))
    return res.status(400).json({ message: "E-mail inválido." });

  try {
    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "E-mail ou senha inválidos." });
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch)
      return res.status(401).json({ message: "Senha inválida." });

    const token = generateToken(user);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Não foi possivel fazer o login." });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  try {
    if (!isValidEmail(email))
      return res.status(400).json({ message: "E-mail inválido." });

    if (!isValidPassword)
      return res.status(400).json({ message: "Senha inválido." });

    if (!name) return res.status(400).json({ message: "Nome inválido." });

    const criptPassword = await hashPassword(password);
    const user = await create({ name, email, password: criptPassword });
    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuario.",error)
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const deleteUserByToken = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  if (!token || !password)
    return res.status(400).json({ message: "Token e senha são obrigatórios." });

  try {
    const userFromToken = jwt.verify(token, secretKey);

    if (typeof userFromToken !== "object" || !("id" in userFromToken)) {
      return res.status(403).json({ message: "Token inválido." });
    }

    const user = await findByEmail(userFromToken.email);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const deletedUser = await currentDelee(user.id);
    return res
      .status(200)
      .json({ message: "Perfil deletado com sucesso.", deletedUser });
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Token inválido ou expirado." });
    }
    return res.status(500).json({ message: "Erro ao deletar perfil." });
  }
};

export const updateUserByToken = async (req: Request, res: Response) => {
  if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    const id = req.user.id;
  const { token, name, email, password } = req.body;

  if (!token) return res.status(401).json({ message: "Token é obrigatório." });

  try {
    const userFromToken = jwt.verify(token, secretKey);

    if (typeof userFromToken !== "object" || !("id" in userFromToken)) {
      return res.status(403).json({ message: "Token inválido." });
    }

    const updatedUser = await update(userFromToken.id, name, email, password);
    return res
      .status(200)
      .json({ message: "Perfil atualizado com sucesso.", updatedUser });
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Token inválido ou expirado." });
    }
    return res.status(500).json({ message: "Erro ao atualizar o perfil." });
  }
};

// Implementar updateUser e deleteUser de forma similar

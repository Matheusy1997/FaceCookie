import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import {
  getUser,
  login,
  createUser,
  deleteUserByToken,
  updateUserByToken,
} from "../controllers/userController";

const router = Router();

router.get("/", getUser);
router.post("/login", login);
router.post("/register", createUser);
router.delete("/delete", authenticateJWT, deleteUserByToken);
router.patch("/update", authenticateJWT, updateUserByToken);

export default router;

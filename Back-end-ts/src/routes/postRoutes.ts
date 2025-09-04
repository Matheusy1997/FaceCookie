import { Router } from "express";
import { authenticateJWT } from "../middleware/authMiddleware";
import { getPosts, createPost, deletePostByToken, updatePostByToken } from "../controllers/postController";

const router = Router()

router.get('/', authenticateJWT, getPosts)
router.post('/create', authenticateJWT, createPost)
router.delete('/delete', authenticateJWT, deletePostByToken)
router.patch('/update', authenticateJWT, updatePostByToken)


export default router
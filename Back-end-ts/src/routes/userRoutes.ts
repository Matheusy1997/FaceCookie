import { Router } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import {  
  getUser, 
  login,
  createUser, 
  deleteUserByToken,
  updateUserByToken
} from '../controllers/userController';

const router = Router();

router.get('/:email', getUser);
router.post('/login', login)
router.post('/register', createUser);
router.post('/delete', authenticateJWT, deleteUserByToken);
router.post('/update', authenticateJWT, updateUserByToken);

export default router;
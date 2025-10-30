import { Router } from 'express';
import { login, register, me, logout } from '../controllers/authController.js';
import { verifyJWT } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyJWT, me);
router.post('/logout', verifyJWT, logout);

export default router;

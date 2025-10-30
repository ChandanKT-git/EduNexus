import { Router } from 'express';
import { verifyJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.use(verifyJWT, authorizeRoles('admin'));

router.get('/stats', async (req, res) => {
  res.json({ users: 0, courses: 0 });
});

export default router;

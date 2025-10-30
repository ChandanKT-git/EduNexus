import { Router } from 'express';
import { verifyJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

// Placeholder routes for MVP
router.get('/', async (req, res) => {
  res.json({ courses: [] });
});

router.post('/', verifyJWT, authorizeRoles('instructor', 'admin'), async (req, res) => {
  res.status(201).json({ course: { id: 'placeholder' } });
});

export default router;

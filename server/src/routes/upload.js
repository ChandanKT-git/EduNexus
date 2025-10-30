import { Router } from 'express';
import { verifyJWT, authorizeRoles } from '../middleware/auth.js';
import { getUploadSignature } from '../controllers/uploadController.js';

const router = Router();

// Only instructors and admins can get signatures for uploads by default
router.post('/signature', verifyJWT, authorizeRoles('instructor', 'admin'), getUploadSignature);

export default router;

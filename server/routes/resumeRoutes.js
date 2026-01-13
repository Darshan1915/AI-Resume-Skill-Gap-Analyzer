import express from 'express';
import { uploadAndExtractSkills } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// The user must be authenticated to upload
router.post('/upload', protect, uploadAndExtractSkills);

export default router;
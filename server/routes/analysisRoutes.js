
import express from 'express';
import { createGapAnalysis, getAnalysisReport, getAnalysisHistory } from '../controllers/analysisController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/gap-check', protect, createGapAnalysis);
router.get('/history', protect, getAnalysisHistory);
router.get('/:reportId', protect, getAnalysisReport);

export default router;
import Resume from '../models/Resume.js';
import AnalysisReport from '../models/AnalysisReport.js';
import { generateGapAnalysis } from '../utils/geminiAI.js';

// @desc    Generate a gap analysis report using Gemini
// @route   POST /api/analysis/gap-check
// @access  Private
export const createGapAnalysis = async (req, res) => {
  const { resumeId, analysisType, target } = req.body;

  if (!resumeId || !['domain', 'job-description', 'market'].includes(analysisType) || !target) {
    return res.status(400).json({ message: 'Missing required analysis parameters.' });
  }

  try {
    // 1. Fetch user's extracted skills
    const resume = await Resume.findById(resumeId);

    if (!resume || resume.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Resume not found or unauthorized.' });
    }
    
    // 2. Call Gemini for Analysis Report
    const reportData = await generateGapAnalysis(
      resume.extractedSkills, 
      analysisType, 
      target
    );
    
    // 3. Save the full report to history
    const report = new AnalysisReport({
      user: req.user._id,
      resume: resumeId,
      analysisType: analysisType,
      target: target,
      reportData: reportData,
    });
    
    const savedReport = await report.save();

    res.status(201).json({
      message: 'Gap analysis complete.',
      reportId: savedReport._id,
      report: savedReport.reportData,
    });

  } catch (error) {
    console.error('Gap Analysis Controller Error:', error);
    res.status(500).json({ message: error.message || 'Internal server error during analysis.' });
  }
};

// @desc    Get a specific analysis report by ID
// @route   GET /api/analysis/:reportId
// @access  Private
export const getAnalysisReport = async (req, res) => {
  try {
    const report = await AnalysisReport.findById(req.params.reportId);

    if (!report || report.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Report not found or unauthorized.' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching report.' });
  }
};

// @desc    Get user's analysis history
// @route   GET /api/analysis/history
// @access  Private
export const getAnalysisHistory = async (req, res) => {
  try {
    const history = await AnalysisReport.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('analysisType target reportData.overallMatch createdAt'); // Select key fields for history view

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching history.' });
  }
};
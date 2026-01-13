import mongoose from 'mongoose';

const analysisReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
  },
  analysisType: {
    type: String, // 'domain', 'job-description', 'market'
    required: true,
  },
  target: {
    type: String, // The domain name or the full job description text
    required: true,
  },
  reportData: {
    // This will store the structured, AI-generated JSON report
    overallMatch: Number, // e.g., 68
    employabilityScore: Number, // e.g., 72
    improvementPotential: Number, // e.g., 28
    skillsMissing: [{
      skillName: String,
      priority: { type: String, enum: ['High', 'Medium', 'Low'] },
      category: String, // e.g., 'Hard Skill'
    }],
    recommendedCourses: [{
      title: String,
      platform: String,
      link: String,
      priority: { type: String, enum: ['High', 'Medium', 'Low'] },
    }],
    recommendedJobs: [{
      title: String,
      company: String,
      matchPercentage: Number,
      source: String,
    }],
  },
}, { timestamps: true });

const AnalysisReport = mongoose.model('AnalysisReport', analysisReportSchema);
export default AnalysisReport;
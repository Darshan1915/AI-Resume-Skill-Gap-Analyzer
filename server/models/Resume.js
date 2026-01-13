import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  extractedSkills: {
    // Storing the structured JSON output from Gemini
    hardSkills: [String],
    softSkills: [String],
    toolsAndTechnologies: [String],
  },
  rawText: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
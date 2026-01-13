import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ResumeDropzone from '../components/dashboard/ResumeDropzone';
import { motion, AnimatePresence } from 'framer-motion';

// API and Context Imports
import { uploadResume, startAnalysis as apiStartAnalysis } from '../api/api';
import { useResume } from '../context/ResumeContext';

const analysisOptions = [
  { id: 'domain', label: '1. Compare with Selected Domain', description: 'Analyze your skills against general requirements for a career field (e.g., Financial Analysis, Digital Marketing).' },
  { id: 'job-description', label: '2. Compare with Specific Job Description', description: 'Paste a specific job posting to get a tailored, high-precision gap report.' },
  { id: 'market', label: '3. Compare with Broad Job Market Trends', description: 'Identify highly sought-after, missing skills in your field based on AI-driven market data.' },
];

// Placeholder for common business domains
const businessDomains = [
    "Financial Analyst", "Data Science/Analytics", "Marketing Management", 
    "Supply Chain & Logistics", "Human Resources", "Business Consulting", 
    "Product Management", "Cybersecurity Analyst"
];


const DashboardPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisType, setAnalysisType] = useState('domain');
  const [domainSelection, setDomainSelection] = useState(businessDomains[0]);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const { setCurrentResumeId, setExtractedSkills } = useResume();
  const navigate = useNavigate();

  const handleFileAccepted = (file) => {
    setSelectedFile(file);
    setUploadError(null); // Clear error on new file selection
  };

  const startAnalysis = async () => {
    if (!selectedFile) {
      setUploadError("Please upload your resume before starting the analysis.");
      return;
    }

    if (analysisType === 'job-description' && !jobDescription.trim()) {
        setUploadError("Please paste the job description text for comparison.");
        return;
    }
    
    setIsAnalyzing(true);
    setUploadError(null);

    try {
        let resumeId;
        
        // 1. Upload Resume & Extract Skills (Backend Call 1)
        // This call handles file reading, text extraction, and Gemini skill normalization.
        const uploadRes = await uploadResume(selectedFile);
        
        resumeId = uploadRes.data.resumeId;
        setCurrentResumeId(resumeId);
        setExtractedSkills(uploadRes.data.extractedSkills);

        let targetValue = '';
        if (analysisType === 'domain') {
            // Send the specific domain name
            targetValue = domainSelection; 
        } else if (analysisType === 'job-description') {
            // Send the JD text
            targetValue = jobDescription;
        } else if (analysisType === 'market') {
            // 🛑 KEY CHANGE: Send a distinct constant to signal 'Market' analysis
            // You should ALSO send the domainSelection as a separate context field if the market comparison is domain-specific.
            targetValue = 'JOB_MARKET_TRENDS'; 
        }

        const analysisData = {
            resumeId: resumeId,
            analysisType: analysisType,
            target: targetValue,
        };

        // 3. Start Gap Analysis (Backend Call 2 - AI Core)
        const analysisRes = await apiStartAnalysis(analysisData);

        // 4. Navigate to Results
        navigate(`/results/${analysisRes.data.reportId}`); 

    } catch (err) {
        console.error('Analysis Error:', err.response?.data || err.message);
        const errorMessage = err.response?.data?.message || 'Failed to complete analysis. Check console for details.';
        setUploadError(errorMessage);
        alert(`Analysis Failed: ${errorMessage}`);
    } finally {
        setIsAnalyzing(false);
    }
  };

  const renderAnalysisInput = () => {
    const componentVariants = {
      initial: { opacity: 0, x: 20, scale: 0.98 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: -20, scale: 0.98 },
    };

    switch (analysisType) {
      case 'domain':
        return (
          <motion.div key="domain" variants={componentVariants} initial="initial" animate="animate" exit="exit" className="p-6 bg-white shadow-inner rounded-xl">
            <h4 className="mb-4 font-semibold text-gray-700">Select Target Domain</h4>
            <select
                value={domainSelection}
                onChange={(e) => setDomainSelection(e.target.value)}
                className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            >
                {businessDomains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                ))}
            </select>
          </motion.div>
        );
      case 'job-description':
        return (
          <motion.div key="jd" variants={componentVariants} initial="initial" animate="animate" exit="exit" className="p-6 bg-white shadow-inner rounded-xl">
            <h4 className="mb-4 font-semibold text-gray-700">Paste Job Description Text</h4>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full text of the job description here..."
              rows="6"
              className="w-full px-4 py-3 transition border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            ></textarea>
          </motion.div>
        );
      case 'market':
        return (
          <motion.div key="market" variants={componentVariants} initial="initial" animate="animate" exit="exit" className="p-6 bg-white shadow-inner rounded-xl">
            <h4 className="mb-4 font-semibold text-gray-700">Market Trend Analysis Selected</h4>
            <p className="text-gray-600">
              The AI will use your extracted skills and compare them against the **most-wanted** business skills for the selected domain based on current market trends.
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="pb-2 text-3xl font-bold text-gray-800 border-b">
            Upload & Gap Analysis Setup
        </h2>
        
        {uploadError && (
            <motion.div 
                className="p-4 font-medium text-red-700 bg-red-100 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {uploadError}
            </motion.div>
        )}

        {/* 1. Resume Upload Section */}
        <div className="p-6 bg-white shadow-xl rounded-xl">
            <h3 className="flex items-center mb-4 text-2xl font-semibold text-primary">
                <span className="mr-3">📄</span> Upload Resume
            </h3>
            <ResumeDropzone onFileAccepted={handleFileAccepted} />
            {selectedFile && <p className="mt-3 text-sm text-green-600">File ready: {selectedFile.name}</p>}
        </div>

        {/* 2. Analysis Selection Section */}
        <div className="p-6 bg-white shadow-xl rounded-xl">
            <h3 className="flex items-center mb-4 text-2xl font-semibold text-primary">
                <span className="mr-3">⚙️</span> Choose Analysis Type
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                {analysisOptions.map((option) => (
                    <motion.div
                        key={option.id}
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                            analysisType === option.id
                                ? 'border-primary bg-blue-50 shadow-md'
                                : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setAnalysisType(option.id)}
                        whileHover={{ translateY: -3 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <h4 className="flex items-center font-bold text-gray-800">
                            {option.label}
                            {analysisType === option.id && <span className="ml-2 text-primary">✓</span>}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">{option.description}</p>
                    </motion.div>
                ))}
            </div>
            
            <AnimatePresence mode="wait">
                {renderAnalysisInput()}
            </AnimatePresence>
        </div>

        {/* 3. Start Analysis Button */}
        <div className="flex justify-center pt-4">
            <Button
                onClick={startAnalysis}
                variant="primary"
                className="px-12 py-4 text-xl animate-popIn"
                disabled={isAnalyzing || !selectedFile}
            >
                {isAnalyzing ? (
                    <span className="flex items-center">
                        <svg className="w-5 h-5 mr-3 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing... Please Wait
                    </span>
                ) : (
                    "🚀 Start Gap Analysis"
                )}
            </Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default DashboardPage;


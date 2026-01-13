import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [extractedSkills, setExtractedSkills] = useState(null);
  const [analysisReport, setAnalysisReport] = useState(null);

  const clearResumeData = () => {
    setCurrentResumeId(null);
    setExtractedSkills(null);
    setAnalysisReport(null);
  };

  const contextValue = {
    currentResumeId,
    setCurrentResumeId,
    extractedSkills,
    setExtractedSkills,
    analysisReport,
    setAnalysisReport,
    clearResumeData,
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
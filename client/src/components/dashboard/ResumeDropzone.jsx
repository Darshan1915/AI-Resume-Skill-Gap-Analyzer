import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

// Install dependency: npm install react-dropzone

const ResumeDropzone = ({ onFileAccepted }) => {
  const [fileName, setFileName] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileName(file.name);
      onFileAccepted(file);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB limit
    multiple: false,
  });

  return (
    <motion.div
      className="p-8 transition-all duration-300 bg-white border-2 border-dashed shadow-lg cursor-pointer rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01, borderColor: '#3B82F6' }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className={`flex flex-col items-center justify-center p-10 space-y-3 transition-colors duration-200 ${isDragActive ? 'bg-blue-50' : 'bg-gray-50'}`}>
        <motion.div
          animate={{ y: isDragActive ? -5 : 0 }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 0.8 }}
          className="text-4xl text-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </motion.div>
        
        {fileName ? (
          <p className="text-lg font-medium text-gray-800 animate-popIn">
            File Selected: <span className="font-semibold text-primary">{fileName}</span>
          </p>
        ) : (
          <p className="text-lg font-medium text-gray-800">
            {isDragActive ? 'Drop the files here...' : 'Drag & drop your Resume, or click to select'}
          </p>
        )}
        <p className="text-sm text-gray-500">
          PDF or DOCX (Max size: 5MB)
        </p>
      </div>
    </motion.div>
  );
};

export default ResumeDropzone;
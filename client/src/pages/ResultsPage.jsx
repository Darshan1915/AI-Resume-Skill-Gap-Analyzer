import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ScoreGauge from '../components/analysis/ScoreGauge';
import SkillComparisonChart from '../components/analysis/SkillComparisonChart';
import { getReport } from '../api/api';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';

// Mock Data Structure (matching AnalysisReport.js model)
const MOCK_REPORT = {
    analysisType: 'job-description',
    target: 'Junior Financial Analyst at Acme Corp',
    reportData: {
        overallMatch: 68,
        employabilityScore: 75,
        improvementPotential: 25,
        skillsMissing: [
            { skillName: "Advanced Excel/VBA", priority: "High", category: "Hard Skill" },
            { skillName: "SQL Database Querying", priority: "High", category: "Tool" },
            { skillName: "Risk Assessment", priority: "Medium", category: "Soft Skill" },
            { skillName: "Financial Modeling", priority: "High", category: "Hard Skill" },
            { skillName: "Presentation Skills", priority: "Low", category: "Soft Skill" },
        ],
        recommendedCourses: [
            { title: "Financial Modeling & Valuation Analyst (FMVA)", platform: "CFI", link: "https://mocklink.com/fmva", priority: "High" },
            { title: "The Complete SQL Bootcamp 2024", platform: "Udemy", link: "https://mocklink.com/sql", priority: "High" },
            { title: "Advanced Excel for Finance Professionals", platform: "LinkedIn Learning", link: "https://mocklink.com/excel", priority: "Medium" },
        ],
        recommendedJobs: [
            { title: "Junior Finance Associate", company: "Globex Inc.", matchPercentage: 88, source: "Indeed" },
            { title: "Business Operations Analyst", company: "Innovate Solutions", matchPercentage: 78, source: "Company Website" },
            { title: "Entry-Level Accountant", company: "Audit Plus", matchPercentage: 72, source: "Glassdoor" },
        ],
    },
};

// Data for the Bar Chart (derived from mock analysis, assuming 10 hard, 5 soft, 5 tool needed)
const CHART_DATA = [
    { category: 'Hard Skills', needed: 10, have: 7 },
    { category: 'Soft Skills', needed: 5, have: 4 },
    { category: 'Tools', needed: 5, have: 3 },
];

const PriorityBadge = ({ priority }) => {
    let colorClass;
    switch (priority) {
        case 'High':
            colorClass = 'bg-red-100 text-red-700 ring-red-500/10';
            break;
        case 'Medium':
            colorClass = 'bg-yellow-100 text-yellow-700 ring-yellow-500/10';
            break;
        case 'Low':
            colorClass = 'bg-green-100 text-green-700 ring-green-500/10';
            break;
        default:
            colorClass = 'bg-gray-100 text-gray-700 ring-gray-500/10';
    }
    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${colorClass} transition-colors duration-200`}>
            {priority}
        </span>
    );
};

const ResultsPage = () => {
    const { analysisId } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            if (analysisId === 'latest' || analysisId === 'mock-analysis-123') {
                // Use mock data for now, replace with actual API call later
                setReport(MOCK_REPORT);
                setLoading(false);
                return;
            }
            
            try {
                const response = await getReport(analysisId);
                setReport(response.data);
            } catch (err) {
                setError('Failed to fetch analysis report. It may not exist.');
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [analysisId]);

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh] text-primary">
                    <svg className="w-8 h-8 mr-3 animate-spin" viewBox="0 0 24 24">...</svg>
                    <span className="text-xl font-medium">Generating AI Report...</span>
                </div>
            </Layout>
        );
    }

    if (error || !report) {
        return <Layout><div className="mt-10 text-xl text-center text-red-600">{error || "Report data is missing."}</div></Layout>;
    }
    
    const { reportData, analysisType, target } = report;

    return (
        <Layout>
            <motion.div 
                className="space-y-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <header className="pb-4 border-b-2 border-primary/20">
                    <motion.h2 
                        className="text-4xl font-extrabold text-gray-900"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        🎯 Gap Analysis Report
                    </motion.h2>
                    <motion.p 
                        className="mt-1 text-lg text-gray-600"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Comparison Target: <span className="font-semibold text-primary">{analysisType === 'domain' ? target : target.substring(0, 50) + '...'}</span>
                    </motion.p>
                </header>

                {/* --- 1. Score Overview & Charts --- */}
                <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <ScoreGauge 
                        score={reportData.employabilityScore} 
                        title="Employability Score" 
                        color="#10B981" // Green
                    />
                    <ScoreGauge 
                        score={reportData.overallMatch} 
                        title="Hard Skills Match" 
                        color="#3B82F6" // Blue
                    />
                    <ScoreGauge 
                        score={reportData.improvementPotential} 
                        title="Improvement Potential" 
                        color="#FACC15" // Yellow/Amber
                    />
                </section>
                
                <section>
                    <SkillComparisonChart data={CHART_DATA} />
                </section>

                {/* --- 2. Skills Gap (The Missing Pieces) --- */}
                <motion.section 
                    className="p-8 bg-white border-t-4 shadow-2xl rounded-xl border-red-500/80"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="flex items-center mb-6 text-3xl font-bold text-red-600">
                        <span className="mr-3">⚠️</span> Critical Skill Gaps Identified
                    </h3>
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <AnimatePresence>
                            {reportData.skillsMissing.map((skill, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-center justify-between p-4 transition-all duration-300 rounded-lg bg-gray-50 hover:bg-red-50"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                >
                                    <span className="font-medium text-gray-800">{skill.skillName}</span>
                                    <PriorityBadge priority={skill.priority} />
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                </motion.section>

                {/* --- 3. Recommendations (Actionable Steps) --- */}
                <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Courses */}
                    <motion.div 
                        className="p-8 bg-white border-t-4 shadow-2xl rounded-xl border-primary/80"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <h3 className="flex items-center mb-4 text-2xl font-bold text-primary">
                            <span className="mr-3">📚</span> Recommended Courses
                        </h3>
                        <ul className="space-y-4">
                            {reportData.recommendedCourses.map((course, index) => (
                                <li key={index} className="flex items-start justify-between pb-3 border-b">
                                    <div>
                                        <p className="font-semibold text-gray-800">{course.title}</p>
                                        <p className="text-sm text-gray-500">Platform: {course.platform}</p>
                                    </div>
                                    <a href={course.link} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="px-3 py-1 ml-4 text-xs">View</Button>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Jobs */}
                    <motion.div 
                        className="p-8 bg-white border-t-4 shadow-2xl rounded-xl border-green-500/80"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.1 }}
                    >
                        <h3 className="flex items-center mb-4 text-2xl font-bold text-green-600">
                            <span className="mr-3">💼</span> Recommended Job Applications
                        </h3>
                        <ul className="space-y-4">
                            {reportData.recommendedJobs.map((job, index) => (
                                <li key={index} className="pb-3 border-b">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-gray-800">{job.title}</p>
                                        <span className="px-3 py-1 text-sm font-bold text-green-600 rounded-full bg-green-50">{job.matchPercentage}% Match</span>
                                    </div>
                                    <p className="text-sm text-gray-500">{job.company} | Source: {job.source}</p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </section>
            </motion.div>
        </Layout>
    );
};

export default ResultsPage;
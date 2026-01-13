
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { getHistory } from '../api/api';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

// Utility function to format the analysis type display
const formatType = (type) => {
    switch (type) {
        case 'domain':
            return 'Domain Comparison';
        case 'job-description':
            return 'Specific Job JD';
        case 'market':
            return 'Market Trends';
        default:
            return 'Analysis';
    }
};

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getHistory();
                // Ensure data is sorted by date (newest first, though backend handles this)
                setHistory(response.data);
            } catch (err) {
                console.error('Error fetching history:', err);
                setError('Failed to load analysis history. Please check your connection.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const handleViewReport = (reportId) => {
        navigate(`/results/${reportId}`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh] text-primary">
                    <svg className="w-8 h-8 mr-3 animate-spin" viewBox="0 0 24 24">...</svg>
                    <span className="text-xl font-medium">Loading History...</span>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h2 
                    className="flex items-center pb-2 text-3xl font-bold text-gray-800 border-b"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <span className="mr-3">🕒</span> Analysis History
                </motion.h2>

                {error && <div className="p-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}

                {history.length === 0 ? (
                    <motion.div 
                        className="p-12 text-center bg-white border border-gray-200 shadow-lg rounded-xl"
                        variants={itemVariants}
                    >
                        <p className="mb-4 text-xl text-gray-600">No past analyses found. Start your first gap analysis!</p>
                        <Button onClick={() => navigate('/dashboard')} variant="primary">Go to Dashboard</Button>
                    </motion.div>
                ) : (
                    <motion.div 
                        className="overflow-hidden bg-white shadow-xl rounded-xl"
                        variants={containerVariants}
                    >
                        {/* Table Structure */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {['Date', 'Analysis Type', 'Target', 'Match Score', 'Actions'].map((header) => (
                                            <th
                                                key={header}
                                                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <motion.tbody 
                                    className="bg-white divide-y divide-gray-200"
                                    initial="hidden"
                                    animate="visible"
                                    variants={containerVariants}
                                >
                                    {history.map((report) => (
                                        <motion.tr 
                                            key={report._id}
                                            className="transition-colors duration-150 hover:bg-blue-50"
                                            variants={itemVariants}
                                        >
                                            {/* Date */}
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {new Date(report.createdAt).toLocaleDateString()}
                                            </td>
                                            {/* Type */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 text-xs font-semibold leading-5 text-indigo-800 bg-indigo-100 rounded-full">
                                                    {formatType(report.analysisType)}
                                                </span>
                                            </td>
                                            {/* Target */}
                                            <td className="max-w-xs px-6 py-4 text-sm text-gray-900 truncate whitespace-nowrap" title={report.target}>
                                                {report.analysisType === 'job-description' 
                                                    ? report.target.substring(0, 30) + '...'
                                                    : report.target}
                                            </td>
                                            {/* Score */}
                                            <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap">
                                                <span className={`text-lg ${report.reportData.overallMatch > 75 ? 'text-green-600' : report.reportData.overallMatch > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                    {report.reportData.overallMatch || 0}%
                                                </span>
                                            </td>
                                            {/* Action */}
                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <Button 
                                                    onClick={() => handleViewReport(report._id)} 
                                                    variant="secondary" 
                                                    className="px-3 py-1 text-sm"
                                                >
                                                    View Report
                                                </Button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </motion.tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </Layout>
    );
};

export default HistoryPage;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Header from '../components/layout/Header'; // <-- Use the unified Header
// import Footer from '../components/layout/Footer'; // <-- Re-use the existing Footer
// import Button from '../components/ui/Button';

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
// };

// const HomePage = () => {
//     return (
//         <div className="flex flex-col min-h-screen bg-gray-50">
//             {/* 1. The Unified Header */}
//             <Header /> 

//             {/* 2. Main Content / Hero Section */}
//             <main className="container flex-grow px-4 py-16 mx-auto sm:px-6 lg:px-8">
//                 <motion.div
//                     className="py-16 text-center md:py-24"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     <motion.h1 
//                         className="text-6xl font-extrabold leading-tight text-gray-900 md:text-7xl"
//                         variants={itemVariants}
//                     >
//                         Close Your <span className="text-primary">Skill Gap.</span>
//                     </motion.h1>
//                     <motion.h1
//                         className="mt-3 text-6xl font-extrabold leading-tight text-gray-900 md:text-7xl"
//                         variants={itemVariants}
//                     >
//                         Land the Job.
//                     </motion.h1>
                    
//                     <motion.p 
//                         className="max-w-3xl mx-auto mt-6 text-xl text-gray-600"
//                         variants={itemVariants}
//                     >
//                         Stop guessing what recruiters want. Our Gemini AI-powered analyzer extracts your resume skills and compares them against any job market, giving you a clear path to improvement.
//                     </motion.p>
                    
//                     {/* Primary Call to Action */}
//                     <motion.div 
//                         className="flex justify-center mt-10 space-x-4"
//                         variants={itemVariants}
//                     >
//                         <Link to="/auth">
//                             <Button variant="primary" className="px-8 py-3 text-xl transition-all duration-300 transform shadow-lg hover:scale-105">
//                                 Start Free Analysis Today 🚀
//                             </Button>
//                         </Link>
//                         <Link to="/about">
//                             <Button variant="outline" className="px-8 py-3 text-xl transition-all duration-300 hover:bg-gray-100">
//                                 How It Works
//                             </Button>
//                         </Link>
//                     </motion.div>
//                 </motion.div>

//                 {/* 3. Feature Section (Simple) */}
//                 <motion.div 
//                     className="grid grid-cols-1 gap-8 mt-20 text-left md:grid-cols-3"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     {/* Feature 1 */}
//                     <motion.div className="p-6 bg-white border-t-4 border-blue-500 shadow-xl rounded-xl" variants={itemVariants}>
//                         <div className="mb-4 text-4xl text-blue-500">🔍</div>
//                         <h3 className="mb-2 text-xl font-bold text-gray-900">AI-Powered Skill Extraction</h3>
//                         <p className="text-gray-600">Instantly pull and categorize hard, soft, and tool skills from your PDF/DOCX resume.</p>
//                     </motion.div>

//                     {/* Feature 2 */}
//                     <motion.div className="p-6 bg-white border-t-4 border-green-500 shadow-xl rounded-xl" variants={itemVariants}>
//                         <div className="mb-4 text-4xl text-green-500">🎯</div>
//                         <h3 className="mb-2 text-xl font-bold text-gray-900">Precision Gap Analysis</h3>
//                         <p className="text-gray-600">Compare your profile against specific job descriptions or broad career domains with Gemini's detailed insights.</p>
//                     </motion.div>
                    
//                     {/* Feature 3 */}
//                     <motion.div className="p-6 bg-white border-t-4 border-yellow-500 shadow-xl rounded-xl" variants={itemVariants}>
//                         <div className="mb-4 text-4xl text-yellow-500">📚</div>
//                         <h3 className="mb-2 text-xl font-bold text-gray-900">Actionable Recommendations</h3>
//                         <p className="text-gray-600">Receive custom recommendations for courses, study materials, and next steps to bridge the gap immediately.</p>
//                     </motion.div>

//                 </motion.div>
//             </main>

//             {/* 4. Footer */}
//             <Footer />
//         </div>
//     );
// };

// export default HomePage;


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

// 1. IMPORT THE AUTH CONTEXT 
// (Assuming you have an AuthContext to track login status)
import { useAuth } from '../context/AuthContext'; 

// Animation variants
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
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

const HomePage = () => {
    // 2. GET LOGIN STATUS
    // Assuming useAuth provides an 'isAuthenticated' boolean
    const { isAuthenticated } = useAuth(); 

    // 3. DETERMINE THE DESTINATION LINK
    // If logged in, go to the dashboard (/dashboard or /analysis). 
    // If not logged in, go to the authentication page (/auth).
    const analysisLink = isAuthenticated ? "/dashboard" : "/auth";

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* 1. The Unified Header */}
            <Header /> 

            {/* 2. Main Content / Hero Section */}
            <main className="container flex-grow px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <motion.div
                    className="py-16 text-center md:py-24"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 
                        className="text-6xl font-extrabold leading-tight text-gray-900 md:text-7xl"
                        variants={itemVariants}
                    >
                        Close Your <span className="text-primary">Skill Gap.</span>
                    </motion.h1>
                    <motion.h1
                        className="mt-3 text-6xl font-extrabold leading-tight text-gray-900 md:text-7xl"
                        variants={itemVariants}
                    >
                        Land the Job.
                    </motion.h1>
                    
                    <motion.p 
                        className="max-w-3xl mx-auto mt-6 text-xl text-gray-600"
                        variants={itemVariants}
                    >
                        Stop guessing what recruiters want. Our Gemini AI-powered analyzer extracts your resume skills and compares them against any job market, giving you a clear path to improvement.
                    </motion.p>
                    
                    {/* Primary Call to Action */}
                    <motion.div 
                        className="flex justify-center mt-10 space-x-4"
                        variants={itemVariants}
                    >
                        {/* 4. Use the conditional analysisLink */}
                        <Link to={analysisLink}> 
                            <Button variant="primary" className="px-8 py-3 text-xl transition-all duration-300 transform shadow-lg hover:scale-105">
                                Start Free Analysis Today 🚀
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="outline" className="px-8 py-3 text-xl transition-all duration-300 hover:bg-gray-100">
                                How It Works
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* 3. Feature Section (Simple) */}
                <motion.div 
                    className="grid grid-cols-1 gap-8 mt-20 text-left md:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Feature 1 */}
                    <motion.div className="p-6 bg-white border-t-4 border-blue-500 shadow-xl rounded-xl" variants={itemVariants}>
                        <div className="mb-4 text-4xl text-blue-500">🔍</div>
                        <h3 className="mb-2 text-xl font-bold text-gray-900">AI-Powered Skill Extraction</h3>
                        <p className="text-gray-600">Instantly pull and categorize hard, soft, and tool skills from your PDF/DOCX resume.</p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div className="p-6 bg-white border-t-4 border-green-500 shadow-xl rounded-xl" variants={itemVariants}>
                        <div className="mb-4 text-4xl text-green-500">🎯</div>
                        <h3 className="mb-2 text-xl font-bold text-gray-900">Precision Gap Analysis</h3>
                        <p className="text-gray-600">Compare your profile against specific job descriptions or broad career domains with Gemini's detailed insights.</p>
                    </motion.div>
                    
                    {/* Feature 3 */}
                    <motion.div className="p-6 bg-white border-t-4 border-yellow-500 shadow-xl rounded-xl" variants={itemVariants}>
                        <div className="mb-4 text-4xl text-yellow-500">📚</div>
                        <h3 className="mb-2 text-xl font-bold text-gray-900">Actionable Recommendations</h3>
                        <p className="text-gray-600">Receive custom recommendations for courses, study materials, and next steps to bridge the gap immediately.</p>
                    </motion.div>

                </motion.div>
            </main>

            {/* 4. Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
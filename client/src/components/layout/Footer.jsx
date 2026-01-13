import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Analyzer",
            links: [
                { name: "Start Analysis", path: "/dashboard" },
                { name: "View Results", path: "/results/latest" },
                { name: "Gap History", path: "/history" },
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Career Blog", path: "/blog" },
                { name: "FAQ", path: "/faq" },
                { name: "Support Center", path: "/support" },
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy" },
            ]
        }
    ];

    return (
        <footer className="mt-12 text-white bg-gray-900 border-t border-primary/20">
            <div className="container px-6 py-12 mx-auto">
                
                {/* Top Section: Logo and Main Links */}
                <div className="grid grid-cols-2 gap-8 pb-8 border-b md:grid-cols-4 lg:grid-cols-5 border-gray-700/50">
                    
                    {/* Brand/Logo Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="mb-2 text-3xl font-extrabold text-primary">SkillBridge</h3>
                            <p className="max-w-sm text-sm text-gray-400">
                                Bridging the gap between your potential and the market demand using AI-driven insights.
                            </p>
                            <div className="flex mt-4 space-x-4 text-gray-400">
                                {/* Social Icons Placeholder */}
                                <a href="#" className="transition-colors duration-200 hover:text-primary">
                                    <i className="fab fa-linkedin-in"></i>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.564-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </a>
                                <a href="#" className="transition-colors duration-200 hover:text-primary">
                                    <i className="fab fa-twitter"></i>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.795-1.574 2.164-2.72-.951.564-2.005.974-3.127 1.195-.897-.959-2.174-1.55-3.593-1.55-2.71 0-4.918 2.208-4.918 4.917 0 .385.044.759.127 1.118-4.088-.205-7.72-2.165-10.14-5.132-.423.722-.66 1.564-.66 2.459 0 1.708.868 3.214 2.186 4.088-.807-.025-1.564-.247-2.23-.618v.061c0 2.385 1.697 4.38 3.963 4.834-.412.112-.848.172-1.296.172-.32 0-.63-.03-1.547-.145.626 1.961 2.433 3.392 4.567 3.432-1.685 1.321-3.805 2.109-6.09 2.109-.395 0-.785-.025-1.168-.069 2.181 1.398 4.773 2.215 7.545 2.215 9.058 0 14.008-7.525 14.008-14.008 0-.214-.005-.429-.012-.644.96-.695 1.792-1.566 2.459-2.556z"/></svg>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation Columns */}
                    {footerSections.map((section, index) => (
                        <motion.div 
                            key={section.title} 
                            className="text-sm"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        >
                            <h4 className="mb-4 text-lg font-semibold text-primary">{section.title}</h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link 
                                            to={link.path} 
                                            className="text-gray-400 transition-colors duration-200 hover:text-white hover:font-medium"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Section: Copyright */}
                <div className="pt-6 text-sm text-center text-gray-500">
                    <p>&copy; {currentYear} SkillBridge Analyzer. All rights reserved. | Built with Darshan Bankar.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
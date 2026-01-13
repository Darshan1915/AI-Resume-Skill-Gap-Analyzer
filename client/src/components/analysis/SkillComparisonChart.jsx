import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const SkillComparisonChart = ({ data }) => {
    // Expected data format: [{ category: 'Hard Skills', needed: 15, have: 10 }, ...]
    
    // Custom Tooltip for better UX
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="p-3 text-sm bg-white border border-gray-200 rounded-lg shadow-md">
              <p className="mb-1 font-bold text-primary">{label}</p>
              {payload.map((p, index) => (
                  <p key={index} style={{ color: p.color }}>
                      {`${p.name}: ${p.value}`}
                  </p>
              ))}
            </div>
          );
        }
        return null;
    };

    return (
        <motion.div
            className="p-6 bg-white border border-gray-100 shadow-lg rounded-xl h-96"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <h3 className="mb-4 text-xl font-semibold text-gray-700">Skill Category Comparison</h3>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis type="category" dataKey="category" stroke="#6b7280" width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="needed" fill="#3B82F6" name="Skills Needed" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="have" fill="#10B981" name="Skills You Have" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default SkillComparisonChart;
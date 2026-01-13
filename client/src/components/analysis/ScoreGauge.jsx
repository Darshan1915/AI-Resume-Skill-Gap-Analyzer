import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { motion } from 'framer-motion';

const ScoreGauge = ({ score, title, color }) => {
  const data = [{
    name: 'Score',
    uv: score,
    pv: 100,
    fill: color,
  }];

  return (
    <motion.div 
        className="flex flex-col items-center p-6 bg-white border border-gray-100 shadow-lg rounded-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
    >
      <h3 className="mb-4 text-xl font-semibold text-gray-700">{title}</h3>
      <ResponsiveContainer width="100%" height={150}>
        <RadialBarChart
          cx="50%"
          cy="70%" // Center position for bottom placement
          innerRadius="75%"
          outerRadius="100%"
          barSize={18}
          data={data}
          startAngle={180} // Start from the bottom
          endAngle={0} // End at the bottom
        >
          {/* Background Arc */}
          <RadialBar
            minAngle={0}
            dataKey="pv"
            cornerRadius={10}
            fill="#e5e7eb" // Light gray background
            isAnimationActive={false}
          />
          {/* Score Arc with Animation */}
          <RadialBar
            minAngle={0}
            dataKey="uv"
            cornerRadius={10}
            fill={color}
            animationDuration={800}
            animationEasing="easeOut"
          />
          {/* Hide the angular axis */}
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angle={180}
            tick={false}
          />
          
          {/* Custom label in the center */}
          <text
            x="50%"
            y="70%"
            textAnchor="middle"
            dominantBaseline="middle"
            className={`text-4xl font-extrabold`}
            style={{ fill: color }}
          >
            {score}%
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ScoreGauge;
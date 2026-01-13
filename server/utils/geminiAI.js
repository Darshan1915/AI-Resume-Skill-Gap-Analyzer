import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

// Initialize the Google GenAI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.5-flash"; // Fast and capable model for structured data tasks

/**
 * 1. Extracts and normalizes skills from resume text into a structured JSON object.
 * (No changes needed in this function)
 */
export async function extractSkills(resumeText) {
  const prompt = `
    Analyze the following resume text and extract the applicant's skills. 
    Categorize them strictly into 'hardSkills', 'softSkills', and 'toolsAndTechnologies'.
    
    Output the result as a single JSON object. DO NOT include any explanatory text or markdown outside of the JSON block.
    
    Resume Text:
    ---
    ${resumeText}
    ---
    
    JSON Schema MUST follow this structure:
    {
      "hardSkills": ["skill1", "skill2"],
      "softSkills": ["skill1", "skill2"],
      "toolsAndTechnologies": ["tool1", "tool2"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("Gemini Skill Extraction Error:", error);
    throw new Error("Failed to extract skills using AI.");
  }
}

/**
 * 2. Compares user skills against a target (domain/JD) and generates a gap analysis report.
 * @param {object} userSkills - The extracted skills object.
 * @param {string} analysisType - 'domain' or 'job-description' or 'market'.
 * @param {string} target - The domain name or the full job description text (or 'JOB_MARKET_TRENDS' for market).
 * @param {string} [domainContext] - OPTIONAL: The domain selected by the user for context in market analysis.
 * @returns {object} - Structured gap analysis report.
 */
export async function generateGapAnalysis(userSkills, analysisType, target, domainContext) {
  const userSkillsString = JSON.stringify(userSkills, null, 2);
  let targetDescription = '';

  if (analysisType === 'job-description') {
    targetDescription = `Job Description: \n"""\n${target}\n"""`;
  } else if (analysisType === 'domain') {
    targetDescription = `Target Career Domain: ${target}. Analyze based on typical entry-level requirements for this field.`;
  } else if (analysisType === 'market') {
    // 💡 FIX: Incorporate domainContext into the prompt to guide the AI
    const context = domainContext ? ` within the **${domainContext}** field.` : '.';
    targetDescription = `Current Business Job Market Trends${context}. Identify the top 5 highly sought-after, missing skills for a professional with this background based on current market data for this field.`;
  }

  const prompt = `
    You are an expert career counselor. Perform a comprehensive gap analysis between the applicant's skills and the target requirements.
    
    Applicant's Extracted Skills (JSON):
    ---
    ${userSkillsString}
    ---
    
    Target Requirement:
    ---
    ${targetDescription}
    ---
    
    Based on the comparison, generate a single JSON report. DO NOT include any explanatory text or markdown outside of the JSON block.
    
    Instructions:
    1. **OverallMatch**: Percentage of hard skills matched.
    2. **EmployabilityScore**: Overall potential considering all skills (hard, soft, tools) and market relevance.
    3. **ImprovementPotential**: 100 - EmployabilityScore.
    4. **skillsMissing**: List of 5-8 crucial missing skills. Assign 'High' priority to fundamental skills for the target, 'Medium' for supporting skills.
    5. **recommendedCourses**: List 3 specific courses (with real-sounding titles, platforms, and dummy links) to cover the 'High' priority missing skills.
    6. **recommendedJobs**: List 3 entry-level job roles (with company names, match percentage, and source) that best match the applicant's existing skills (70% match or higher).

    JSON Schema MUST follow this structure:
    {
      "overallMatch": 75, 
      "employabilityScore": 82, 
      "improvementPotential": 18,
      "skillsMissing": [{ "skillName": "Advanced Financial Modeling", "priority": "High", "category": "Hard Skill" }],
      "recommendedCourses": [{ "title": "Python for Business Analytics", "platform": "Coursera", "link": "https://example.com/course", "priority": "High" }],
      "recommendedJobs": [{ "title": "Junior Business Analyst", "company": "Tech Solutions Inc", "matchPercentage": 85, "source": "LinkedIn" }]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("Gemini Gap Analysis Error:", error);
    throw new Error("Failed to generate gap analysis report.");
  }
}


// import { GoogleGenAI } from '@google/genai';
// import dotenv from 'dotenv';
// dotenv.config();

// // Initialize the Google GenAI client
// // Ensure GEMINI_API_KEY is in your server/.env file
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// const model = "gemini-2.5-flash"; // Fast and capable model for structured data tasks

// /**
//  * 1. Extracts and normalizes skills from resume text into a structured JSON object.
//  * @param {string} resumeText - The raw text content of the resume.
//  * @returns {object} - Structured skills object.
//  */
// export async function extractSkills(resumeText) {
//   const prompt = `
//     Analyze the following resume text and extract the applicant's skills. 
//     Categorize them strictly into 'hardSkills', 'softSkills', and 'toolsAndTechnologies'.
    
//     Output the result as a single JSON object. DO NOT include any explanatory text or markdown outside of the JSON block.
    
//     Resume Text:
//     ---
//     ${resumeText}
//     ---
    
//     JSON Schema MUST follow this structure:
//     {
//       "hardSkills": ["skill1", "skill2"],
//       "softSkills": ["skill1", "skill2"],
//       "toolsAndTechnologies": ["tool1", "tool2"]
//     }
//   `;

//   try {
//     const response = await ai.models.generateContent({
//       model: model,
//       contents: prompt,
//       config: {
//         responseMimeType: "application/json",
//       },
//     });

//     // The response text is guaranteed to be JSON due to responseMimeType
//     const jsonString = response.text.trim();
//     return JSON.parse(jsonString);

//   } catch (error) {
//     console.error("Gemini Skill Extraction Error:", error);
//     throw new Error("Failed to extract skills using AI.");
//   }
// }

// /**
//  * 2. Compares user skills against a target (domain/JD) and generates a gap analysis report.
//  * @param {object} userSkills - The extracted skills object.
//  * @param {string} analysisType - 'domain' or 'job-description' or 'market'.
//  * @param {string} target - The domain name or the full job description text.
//  * @returns {object} - Structured gap analysis report.
//  */
// export async function generateGapAnalysis(userSkills, analysisType, target) {
//   const userSkillsString = JSON.stringify(userSkills, null, 2);
//   let targetDescription = '';

//   if (analysisType === 'job-description') {
//     targetDescription = `Job Description: \n"""\n${target}\n"""`;
//   } else if (analysisType === 'domain') {
//     targetDescription = `Target Career Domain: ${target}. Analyze based on typical entry-level requirements for this field.`;
//   } else if (analysisType === 'market') {
//     targetDescription = `Current Business Job Market Trends. Identify the top 5 highly sought-after, missing skills for a business graduate in fields like Consulting and Finance.`;
//   }

//   const prompt = `
//     You are an expert career counselor. Perform a comprehensive gap analysis between the applicant's skills and the target requirements.
    
//     Applicant's Extracted Skills (JSON):
//     ---
//     ${userSkillsString}
//     ---
    
//     Target Requirement:
//     ---
//     ${targetDescription}
//     ---
    
//     Based on the comparison, generate a single JSON report. DO NOT include any explanatory text or markdown outside of the JSON block.
    
//     Instructions:
//     1. **OverallMatch**: Percentage of hard skills matched.
//     2. **EmployabilityScore**: Overall potential considering all skills (hard, soft, tools) and market relevance.
//     3. **ImprovementPotential**: 100 - EmployabilityScore.
//     4. **skillsMissing**: List of 5-8 crucial missing skills. Assign 'High' priority to fundamental skills for the target, 'Medium' for supporting skills.
//     5. **recommendedCourses**: List 3 specific courses (with real-sounding titles, platforms, and dummy links) to cover the 'High' priority missing skills.
//     6. **recommendedJobs**: List 3 entry-level job roles (with company names, match percentage, and source) that best match the applicant's existing skills (70% match or higher).

//     JSON Schema MUST follow this structure:
//     {
//       "overallMatch": 75, 
//       "employabilityScore": 82, 
//       "improvementPotential": 18,
//       "skillsMissing": [{ "skillName": "Advanced Financial Modeling", "priority": "High", "category": "Hard Skill" }],
//       "recommendedCourses": [{ "title": "Python for Business Analytics", "platform": "Coursera", "link": "https://example.com/course", "priority": "High" }],
//       "recommendedJobs": [{ "title": "Junior Business Analyst", "company": "Tech Solutions Inc", "matchPercentage": 85, "source": "LinkedIn" }]
//     }
//   `;

//   try {
//     const response = await ai.models.generateContent({
//       model: model,
//       contents: prompt,
//       config: {
//         responseMimeType: "application/json",
//       },
//     });

//     const jsonString = response.text.trim();
//     return JSON.parse(jsonString);

//   } catch (error) {
//     console.error("Gemini Gap Analysis Error:", error);
//     throw new Error("Failed to generate gap analysis report.");
//   }
// }
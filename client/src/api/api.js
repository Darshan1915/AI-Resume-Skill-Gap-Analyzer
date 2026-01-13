import axios from 'axios';

// Set the base URL for the backend API
const API = axios.create({
  baseURL: "https://ai-resume-skill-gap-analyzer-1.onrender.com", // your backend URL
  withCredentials: true,
});

// attach token for protected routes
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// --- AUTH APIS ---
export const loginUser = (email, password) =>
  API.post("/auth/login", { email, password });

export const registerUser = (name, email, password) =>
  API.post("/auth/register", { name, email, password });

// --- Resume & Analysis Calls ---

// 1. Upload Resume and Extract Skills
export const uploadResume = (file) => {
    const formData = new FormData();
    formData.append('resumeFile', file);
    return API.post('/resume/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// 2. Start Gap Analysis
export const startAnalysis = (data) => API.post('/analysis/gap-check', data);

// 3. Get Specific Report
export const getReport = (reportId) => API.get(`/analysis/${reportId}`);

// 4. Get History
export const getHistory = () => API.get('/analysis/history');

export default API;

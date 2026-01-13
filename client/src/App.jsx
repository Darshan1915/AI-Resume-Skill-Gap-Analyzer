import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext'; 

// Pages
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage'; 
import ResultsPage from './pages/ResultsPage';     
import HistoryPage from './pages/HistoryPage';     

// A simple Private Route wrapper (This component USES AuthContext)
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // <- Accesses AuthContext

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-primary">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <Router>
      {/* ISSUE: ResumeProvider was outside AuthProvider.
        Since PrivateRoute and Header rely on useAuth(), 
        AuthProvider MUST wrap all components that use it.
        
        CORRECTION: Nest all components/routes inside AuthProvider.
      */}
      <AuthProvider> 
        <ResumeProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Private Routes (Children of PrivateRoute, which is a consumer) */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage /> 
                </PrivateRoute>
              }
            />
            <Route
              path="/results/:analysisId"
              element={
                <PrivateRoute>
                  <ResultsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <HistoryPage />
                </PrivateRoute>
              }
            />
            {/* Fallback for unmatched routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ResumeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { ResumeProvider } from './context/ResumeContext'; 

// // Pages
// import HomePage from './pages/HomePage';
// import AuthPage from './pages/AuthPage';
// import DashboardPage from './pages/DashboardPage'; // Will create next
// import ResultsPage from './pages/ResultsPage';     // Will create next
// import HistoryPage from './pages/HistoryPage';     // Will create next

// // A simple Private Route wrapper
// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-xl text-primary">
//         Loading...
//       </div>
//     );
//   }

//   return isAuthenticated ? children : <Navigate to="/auth" />;
// };

// function App() {
//   return (
//     <Router>
//       <ResumeProvider>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/auth" element={<AuthPage />} />
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <DashboardPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/results/:analysisId" // Dynamic route for specific analysis results
//             element={
//               <PrivateRoute>
//                 <ResultsPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/history"
//             element={
//               <PrivateRoute>
//                 <HistoryPage />
//               </PrivateRoute>
//             }
//           />
//           {/* Fallback for unmatched routes */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </AuthProvider>
//       </ResumeProvider>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Call AuthContext -> login -> api.js
        await login(email, password);
      } else {
        if (password !== confirmPassword)
          return setError("Passwords do not match!");
        await register(name, email, password);
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Authentication failed. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? 50 : -50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: {
      opacity: 0,
      x: isLogin ? -50 : 50,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <motion.div
        className="relative w-full max-w-md p-8 shadow-2xl bg-card md:p-10 rounded-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-2 text-3xl font-bold text-center text-gray-900">
          SkillBridge Analyzer
        </h2>
        <p className="mb-8 text-sm text-center text-gray-600">
          Employability Skills Assessment Platform
        </p>

        {/* Switch between Login / Register */}
        <div className="flex p-1 mb-8 bg-gray-100 rounded-xl">
          <Button
            onClick={() => setIsLogin(true)}
            className={`flex-1 ${
              isLogin ? "bg-primary text-white" : "bg-transparent text-gray-700"
            } py-2 px-4 rounded-lg`}
          >
            Login
          </Button>
          <Button
            onClick={() => setIsLogin(false)}
            className={`flex-1 ${
              !isLogin ? "bg-primary text-white" : "bg-transparent text-gray-700"
            } py-2 px-4 rounded-lg`}
          >
            Register
          </Button>
        </div>

        {/* Actual Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? "login" : "register"}
            onSubmit={handleAuth}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            className="space-y-6"
          >
            {!isLogin && (
              <Input
                id="name"
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {!isLogin && (
              <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-center text-red-500"
              >
                {error}
              </motion.p>
            )}

            <Button type="submit" className="w-full py-3 text-lg" disabled={loading}>
              {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
            </Button>
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthPage;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Button from '../components/ui/Button';
// import Input from '../components/ui/Input';
// import { motion, AnimatePresence } from 'framer-motion';

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     // Dummy API call simulation
//     try {
//       if (isLogin) {
//         // Mock login successful
//         if (email === 'test@example.com' && password === 'password') {
//           await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
//           login('dummy-jwt-token', email);
//           navigate('/dashboard');
//         } else {
//           setError('Invalid email or password.');
//         }
//       } else {
//         if (password !== confirmPassword) {
//           setError('Passwords do not match.');
//           return;
//         }
//         // Mock register successful
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
//         login('new-dummy-jwt-token', email); // Log in immediately after registration
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError('An unexpected error occurred. Please try again.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formVariants = {
//     hidden: { opacity: 0, x: isLogin ? 50 : -50, scale: 0.95 },
//     visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
//     exit: { opacity: 0, x: isLogin ? -50 : 50, scale: 0.95, transition: { duration: 0.2 } },
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
//       <motion.div
//         className="relative w-full max-w-md p-8 shadow-2xl bg-card md:p-10 rounded-2xl animate-popIn"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="flex justify-center mb-6">
//           <motion.div
//             className="p-4 text-white rounded-full shadow-lg bg-primary"
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-10 h-10"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M13 10V3L4 14h7v7l9-11h-7z"
//               />
//             </svg>
//           </motion.div>
//         </div>
//         <h2 className="mb-2 text-3xl font-bold text-center text-gray-900">
//           SkillBridge Analyzer
//         </h2>
//         <p className="mb-8 text-sm text-center text-gray-600">
//           Employability Skills Assessment Platform
//         </p>

//         <div className="flex p-1 mb-8 bg-gray-100 rounded-xl">
//           <Button
//             onClick={() => setIsLogin(true)}
//             variant={isLogin ? 'primary' : 'secondary'}
//             className={`flex-1 !shadow-none ${isLogin ? 'bg-primary text-white' : 'bg-transparent text-gray-700 hover:bg-gray-200'} py-2 px-4 rounded-lg`}
//           >
//             Login
//           </Button>
//           <Button
//             onClick={() => setIsLogin(false)}
//             variant={!isLogin ? 'primary' : 'secondary'}
//             className={`flex-1 !shadow-none ${!isLogin ? 'bg-primary text-white' : 'bg-transparent text-gray-700 hover:bg-gray-200'} py-2 px-4 rounded-lg`}
//           >
//             Register
//           </Button>
//         </div>

//         <AnimatePresence mode="wait">
//           <motion.form
//             key={isLogin ? 'login' : 'register'}
//             onSubmit={handleAuth}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={formVariants}
//             className="space-y-6"
//           >
//             <Input
//               id="email"
//               type="email"
//               label="Email Address"
//               placeholder="your@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <Input
//               id="password"
//               type="password"
//               label="Password"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {!isLogin && (
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 label="Confirm Password"
//                 placeholder="••••••••"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             )}

//             {error && (
//               <motion.p
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-sm text-center text-red-500"
//               >
//                 {error}
//               </motion.p>
//             )}

//             <Button
//               type="submit"
//               className="w-full py-3 text-lg"
//               disabled={loading}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="w-5 h-5 mr-3 text-white animate-spin" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   {isLogin ? 'Logging In...' : 'Registering...'}
//                 </span>
//               ) : (
//                 isLogin ? 'Login' : 'Register'
//               )}
//             </Button>
//           </motion.form>
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// export default AuthPage;
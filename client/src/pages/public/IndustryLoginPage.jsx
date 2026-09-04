import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Briefcase, Sun, Moon, Sparkles } from 'lucide-react';
import industryHeroLight from '../../assets/industry_hero_light.jpg';
import industryHeroDark from '../../assets/industry_hero_dark.jpg';

export const IndustryLoginPage = () => {
  const navigate = useNavigate();
  const { login, demoLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Local theme toggle state (Light / Dark) as depicted in the reference image upper/lower versions
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email || 'company@demo.com', password || 'password123');
    setLoading(false);

    if (res.success) {
      navigate('/company/dashboard');
    } else {
      // Fallback demo login if invalid
      const demoRes = await demoLogin('company');
      if (demoRes.success) {
        navigate('/company/dashboard');
      } else {
        setError(res.message || 'Invalid credentials');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    const res = await demoLogin('company');
    setLoading(false);
    if (res.success) {
      navigate('/company/dashboard');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? 'bg-[#060B18] text-white dark' : 'bg-[#F4F7FF] text-slate-900'}`}>
      
      {/* ── Top Role Switcher & Theme Control Bar ──────────────── */}
      <div className={`w-full py-3 px-4 border-b flex flex-wrap items-center justify-between gap-3 text-xs font-medium ${isDarkMode ? 'bg-[#091124] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Select Role Login:</span>
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => navigate('/login/student')}
              className="px-3 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              🎓 Student
            </button>
            <button
              onClick={() => navigate('/login/college')}
              className="px-3 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              🏛️ University
            </button>
            <button
              onClick={() => navigate('/login/industry')}
              className="px-3 py-1 rounded-lg bg-[#8B5CF6] text-white font-bold shadow-sm transition-all flex items-center gap-1"
            >
              💼 Industry
            </button>
            <button
              onClick={() => navigate('/login/reference-grid')}
              className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 font-semibold transition-all flex items-center gap-1"
              title="View all 6 light & dark login variants side by side"
            >
              <Sparkles className="w-3 h-3" />
              View 6-Grid Reference
            </button>
          </div>
        </div>

        {/* Theme Switcher Button (Upper = Light, Lower = Dark) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700' 
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 shadow-sm'
            }`}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
            <span>{isDarkMode ? 'Theme: Lower (Dark)' : 'Theme: Upper (Light)'}</span>
          </button>
        </div>
      </div>

      {/* ── Main Container ───────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center min-h-[calc(100vh-60px)]">
        
        {/* Main Card Container */}
        <div className={`w-full rounded-3xl p-6 sm:p-10 border transition-all duration-300 shadow-2xl relative overflow-hidden ${
          isDarkMode 
            ? 'bg-[#080E1E] border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.6)]' 
            : 'bg-white border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)]'
        }`}>
          
          {/* Header Brand Logo */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>Campus</span>
                <span className="inline-block mx-1">🌉</span>
                <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>Career</span>
              </h1>
            </div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-1">
              Learn · Build · Grow · Succeed
            </p>
          </div>

          {/* Grid Layout: Left Hero Section & Right Form Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* ── LEFT HERO COLUMN ───────────────────────────────── */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full pr-0 lg:pr-4">
              <div>
                {/* Pill Tag */}
                <div className="inline-block mb-4">
                  <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isDarkMode
                      ? 'bg-[#24143D] text-[#A855F7]'
                      : 'bg-[#F3E8FF] text-[#8B5CF6]'
                  }`}>
                    For Industry
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3">
                  Discover <br />
                  <span className="text-[#8B5CF6] dark:text-[#A855F7]">Talent Drive Change</span>
                </h2>

                {/* Subtitle */}
                <p className={`text-sm sm:text-base leading-relaxed max-w-lg mb-6 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Connect with skilled talent and collaborate for a stronger tomorrow.
                </p>
              </div>

              {/* Artwork Illustration */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-800/80 group">
                <img
                  src={isDarkMode ? industryHeroDark : industryHeroLight}
                  alt="Industry Corporate Skyline Illustration"
                  className="w-full h-56 sm:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Handwritten Callout */}
                <div className="absolute bottom-3 left-4 text-white font-serif italic text-base sm:text-lg drop-shadow-md">
                  Let's Build a Skilled Tomorrow...
                </div>
              </div>
            </div>

            {/* ── RIGHT LOGIN FORM COLUMN ────────────────────────── */}
            <div className="lg:col-span-5">
              <div className={`w-full rounded-2xl p-6 sm:p-8 border transition-all ${
                isDarkMode
                  ? 'bg-[#0C162D] border-slate-800 text-white shadow-xl'
                  : 'bg-white border-slate-200/80 text-slate-900 shadow-xl'
              }`}>

                {/* Top Icon Badge */}
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#F3E8FF] dark:bg-[#281347] flex items-center justify-center text-[#8B5CF6] dark:text-[#A855F7] shadow-inner">
                    <Briefcase className="w-7 h-7" />
                  </div>
                </div>

                {/* Title & Description */}
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Industry Login
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Welcome back! Sign in to explore talent and opportunities.
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-medium">
                    {error}
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Email Field */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                          isDarkMode
                            ? 'bg-[#060D1E] border-slate-800 text-white placeholder-slate-500'
                            : 'bg-slate-50/80 border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className={`w-full pl-10 pr-10 py-2.5 text-xs rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                          isDarkMode
                            ? 'bg-[#060D1E] border-slate-800 text-white placeholder-slate-500'
                            : 'bg-slate-50/80 border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me & Forgot password */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-slate-300 text-[#8B5CF6] focus:ring-[#8B5CF6]"
                      />
                      <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                        Remember me
                      </span>
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your email'); }}
                      className="font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7839ee] disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md shadow-[#8B5CF6]/20 flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Login'
                    )}
                  </button>
                </form>

                {/* Registration Link */}
                <div className="text-center mt-4 text-xs">
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
                    Don't have an account?{' '}
                  </span>
                  <Link
                    to="/register/company"
                    className="font-bold text-[#8B5CF6] dark:text-[#A855F7] hover:underline"
                  >
                    Register here
                  </Link>
                </div>

                {/* Divider */}
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`w-full border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`} />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase">
                    <span className={`px-2 ${isDarkMode ? 'bg-[#0C162D] text-slate-500' : 'bg-white text-slate-400'}`}>
                      or
                    </span>
                  </div>
                </div>

                {/* Google Sign-in Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2.5 text-xs font-semibold transition-all ${
                    isDarkMode
                      ? 'bg-[#060D1E] border-slate-800 text-slate-200 hover:bg-slate-800/60'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

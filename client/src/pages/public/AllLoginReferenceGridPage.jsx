import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, GraduationCap, Building2, Briefcase, ArrowLeft } from 'lucide-react';
import studentHeroLight from '../../assets/student_hero_light.jpg';
import studentHeroDark from '../../assets/student_hero_dark.jpg';
import universityHeroLight from '../../assets/university_hero_light.jpg';
import universityHeroDark from '../../assets/university_hero_dark.jpg';
import industryHeroLight from '../../assets/industry_hero_light.jpg';
import industryHeroDark from '../../assets/industry_hero_dark.jpg';

export const AllLoginReferenceGridPage = () => {
  const navigate = useNavigate();
  const { login, demoLogin } = useAuth();
  const [showPassword, setShowPassword] = useState({});

  const togglePassword = (cardKey) => {
    setShowPassword(prev => ({ ...prev, [cardKey]: !prev[cardKey] }));
  };

  const handleRoleSubmit = async (e, role) => {
    e.preventDefault();
    const res = await demoLogin(role);
    if (res.success) {
      navigate(`/${role}/dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8 font-sans">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigate('/login/student')}
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline mb-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Interactive Student Login
          </button>
          <h1 className="text-2xl font-black text-white">
            Campus2Career Role Login Design Showcase
          </h1>
          <p className="text-xs text-slate-400">
            Top Row = Light Theme (Upper) · Bottom Row = Dark Theme (Lower) matching reference image
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/login/student')}
            className="px-3 py-1.5 rounded-lg bg-[#00B26E] text-white text-xs font-bold"
          >
            🎓 Student Page
          </button>
          <button
            onClick={() => navigate('/login/college')}
            className="px-3 py-1.5 rounded-lg bg-[#1D70F5] text-white text-xs font-bold"
          >
            🏛️ University Page
          </button>
          <button
            onClick={() => navigate('/login/industry')}
            className="px-3 py-1.5 rounded-lg bg-[#8B5CF6] text-white text-xs font-bold"
          >
            💼 Industry Page
          </button>
        </div>
      </div>

      {/* 6-Card Grid (3 Columns x 2 Rows) */}
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* UPPER ROW: LIGHT THEME VERSIONS */}
        <div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            Upper Row: Light Theme Designs
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Student Login (Light) */}
            <div className="rounded-2xl p-5 bg-white border border-slate-200 text-slate-900 shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-center mb-4">
                  <h2 className="text-lg font-black text-blue-600">Campus 🌉 Career</h2>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Learn · Build · Grow · Succeed</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E6F9F0] text-[#00A865]">For Students</span>
                </div>
                <h3 className="text-xl font-black mb-1">Big Dreams <span className="text-[#00B26E]">Start Here</span></h3>
                <p className="text-xs text-slate-500 mb-3">Learn today, build your skills, and step into a brighter tomorrow.</p>
                <div className="relative rounded-xl overflow-hidden mb-4 border">
                  <img src={studentHeroLight} alt="Student Light" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-2 left-2 text-white font-serif italic text-xs drop-shadow">Your Future Awaits...</div>
                </div>
              </div>

              {/* Login Card inside */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-center mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#E6F9F0] flex items-center justify-center text-[#00B26E]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-center">Student Login</h4>
                <p className="text-[10px] text-slate-500 text-center mb-3">Welcome back! Sign in to continue your learning journey.</p>
                <form onSubmit={(e) => handleRoleSubmit(e, 'student')} className="space-y-2">
                  <input type="email" placeholder="Enter your email" className="w-full text-xs p-2 rounded-lg border bg-white" required />
                  <input type="password" placeholder="Enter your password" className="w-full text-xs p-2 rounded-lg border bg-white" required />
                  <button type="submit" className="w-full py-2 rounded-lg bg-[#00B26E] text-white text-xs font-bold">Login</button>
                </form>
              </div>
            </div>

            {/* 2. University Login (Light) */}
            <div className="rounded-2xl p-5 bg-white border border-slate-200 text-slate-900 shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-center mb-4">
                  <h2 className="text-lg font-black text-blue-600">Campus 🌉 Career</h2>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Learn · Build · Grow · Succeed</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EBF4FF] text-[#1D70F5]">For Universities</span>
                </div>
                <h3 className="text-xl font-black mb-1">Shape <span className="text-[#1D70F5]">Brighter Futures</span></h3>
                <p className="text-xs text-slate-500 mb-3">Track progress, bridge skill gaps, and empower students for a better tomorrow.</p>
                <div className="relative rounded-xl overflow-hidden mb-4 border">
                  <img src={universityHeroLight} alt="University Light" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-2 left-2 text-white font-serif italic text-xs drop-shadow">Education Creates Opportunities...</div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-center mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#EBF4FF] flex items-center justify-center text-[#1D70F5]">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-center">University Login</h4>
                <p className="text-[10px] text-slate-500 text-center mb-3">Welcome back! Sign in to manage your institution.</p>
                <form onSubmit={(e) => handleRoleSubmit(e, 'college')} className="space-y-2">
                  <input type="email" placeholder="Enter your email" className="w-full text-xs p-2 rounded-lg border bg-white" required />
                  <input type="password" placeholder="Enter your password" className="w-full text-xs p-2 rounded-lg border bg-white" required />
                  <button type="submit" className="w-full py-2 rounded-lg bg-[#1D70F5] text-white text-xs font-bold">Login</button>
                </form>
              </div>
            </div>

            {/* 3. Industry Login (Light) */}
            <div className="rounded-2xl p-5 bg-white border border-slate-200 text-slate-900 shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-center mb-4">
                  <h2 className="text-lg font-black text-blue-600">Campus 🌉 Career</h2>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Learn · Build · Grow · Succeed</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F3E8FF] text-[#8B5CF6]">For Industry</span>
                </div>
                <h3 className="text-xl font-black mb-1">Discover <span className="text-[#8B5CF6]">Talent Drive Change</span></h3>
                <p className="text-xs text-slate-500 mb-3">Connect with skilled talent and collaborate for a stronger tomorrow.</p>
                <div className="relative rounded-xl overflow-hidden mb-4 border">
                  <img src={industryHeroLight} alt="Industry Light" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-2 left-2 text-white font-serif italic text-xs drop-shadow">Let's Build a Skilled Tomorrow...</div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-center mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#8B5CF6]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-center">Industry Login</h4>
                <p className="text-[10px] text-slate-500 text-center mb-3">Welcome back! Sign in to explore talent and opportunities.</p>
                <form onSubmit={(e) => handleRoleSubmit(e, 'company')} className="space-y-2">
                  <input type="email" placeholder="Enter your email" className="w-full text-xs p-2 rounded-lg border bg-white" required />
                  <input type="password" placeholder="Enter your password" className="w-full text-xs p-2 rounded-lg border bg-white" required />
                  <button type="submit" className="w-full py-2 rounded-lg bg-[#8B5CF6] text-white text-xs font-bold">Login</button>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* LOWER ROW: DARK THEME VERSIONS */}
        <div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
            Lower Row: Dark Theme Designs
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 4. Student Login (Dark) */}
            <div className="rounded-2xl p-5 bg-[#080E1E] border border-slate-800 text-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-center mb-4">
                  <h2 className="text-lg font-black text-blue-400">Campus 🌉 Career</h2>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Learn · Build · Grow · Succeed</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#004B2F] text-[#00E68A]">For Students</span>
                </div>
                <h3 className="text-xl font-black mb-1">Big Dreams <span className="text-[#00C875]">Start Here</span></h3>
                <p className="text-xs text-slate-400 mb-3">Learn today, build your skills, and step into a brighter tomorrow.</p>
                <div className="relative rounded-xl overflow-hidden mb-4 border border-slate-800">
                  <img src={studentHeroDark} alt="Student Dark" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-2 left-2 text-white font-serif italic text-xs drop-shadow">Your Future Awaits...</div>
                </div>
              </div>

              <div className="bg-[#0C162D] p-4 rounded-xl border border-slate-800">
                <div className="flex justify-center mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#062E1E] flex items-center justify-center text-[#00C875]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-center">Student Login</h4>
                <p className="text-[10px] text-slate-400 text-center mb-3">Welcome back! Sign in to continue your learning journey.</p>
                <form onSubmit={(e) => handleRoleSubmit(e, 'student')} className="space-y-2">
                  <input type="email" placeholder="Enter your email" className="w-full text-xs p-2 rounded-lg border border-slate-800 bg-[#060D1E] text-white" required />
                  <input type="password" placeholder="Enter your password" className="w-full text-xs p-2 rounded-lg border border-slate-800 bg-[#060D1E] text-white" required />
                  <button type="submit" className="w-full py-2 rounded-lg bg-[#00B26E] text-white text-xs font-bold">Login</button>
                </form>
              </div>
            </div>

            {/* 5. University Login (Dark) */}
            <div className="rounded-2xl p-5 bg-[#080E1E] border border-slate-800 text-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-center mb-4">
                  <h2 className="text-lg font-black text-blue-400">Campus 🌉 Career</h2>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Learn · Build · Grow · Succeed</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#092244] text-[#3B82F6]">For Universities</span>
                </div>
                <h3 className="text-xl font-black mb-1">Shape <span className="text-[#3B82F6]">Brighter Futures</span></h3>
                <p className="text-xs text-slate-400 mb-3">Track progress, bridge skill gaps, and empower students for a better tomorrow.</p>
                <div className="relative rounded-xl overflow-hidden mb-4 border border-slate-800">
                  <img src={universityHeroDark} alt="University Dark" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-2 left-2 text-white font-serif italic text-xs drop-shadow">Education Creates Opportunities...</div>
                </div>
              </div>

              <div className="bg-[#0C162D] p-4 rounded-xl border border-slate-800">
                <div className="flex justify-center mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#0A244E] flex items-center justify-center text-[#3B82F6]">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-center">University Login</h4>
                <p className="text-[10px] text-slate-400 text-center mb-3">Welcome back! Sign in to manage your institution.</p>
                <form onSubmit={(e) => handleRoleSubmit(e, 'college')} className="space-y-2">
                  <input type="email" placeholder="Enter your email" className="w-full text-xs p-2 rounded-lg border border-slate-800 bg-[#060D1E] text-white" required />
                  <input type="password" placeholder="Enter your password" className="w-full text-xs p-2 rounded-lg border border-slate-800 bg-[#060D1E] text-white" required />
                  <button type="submit" className="w-full py-2 rounded-lg bg-[#1D70F5] text-white text-xs font-bold">Login</button>
                </form>
              </div>
            </div>

            {/* 6. Industry Login (Dark) */}
            <div className="rounded-2xl p-5 bg-[#080E1E] border border-slate-800 text-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-center mb-4">
                  <h2 className="text-lg font-black text-blue-400">Campus 🌉 Career</h2>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Learn · Build · Grow · Succeed</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#24143D] text-[#A855F7]">For Industry</span>
                </div>
                <h3 className="text-xl font-black mb-1">Discover <span className="text-[#A855F7]">Talent Drive Change</span></h3>
                <p className="text-xs text-slate-400 mb-3">Connect with skilled talent and collaborate for a stronger tomorrow.</p>
                <div className="relative rounded-xl overflow-hidden mb-4 border border-slate-800">
                  <img src={industryHeroDark} alt="Industry Dark" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-2 left-2 text-white font-serif italic text-xs drop-shadow">Let's Build a Skilled Tomorrow...</div>
                </div>
              </div>

              <div className="bg-[#0C162D] p-4 rounded-xl border border-slate-800">
                <div className="flex justify-center mb-2">
                  <div className="w-9 h-9 rounded-full bg-[#281347] flex items-center justify-center text-[#A855F7]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-center">Industry Login</h4>
                <p className="text-[10px] text-slate-400 text-center mb-3">Welcome back! Sign in to explore talent and opportunities.</p>
                <form onSubmit={(e) => handleRoleSubmit(e, 'company')} className="space-y-2">
                  <input type="email" placeholder="Enter your email" className="w-full text-xs p-2 rounded-lg border border-slate-800 bg-[#060D1E] text-white" required />
                  <input type="password" placeholder="Enter your password" className="w-full text-xs p-2 rounded-lg border border-slate-800 bg-[#060D1E] text-white" required />
                  <button type="submit" className="w-full py-2 rounded-lg bg-[#8B5CF6] text-white text-xs font-bold">Login</button>
                </form>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

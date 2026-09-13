import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Mail, KeyRound, ArrowLeft, RefreshCw, Smartphone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  AuthError,
  AuthField,
  AuthInput,
  ChangeAccountType,
  PasswordInput,
  RoleAuthLayout,
} from '../../components/auth/RoleAuthLayout';

export const StudentLoginPage = () => {
  const navigate = useNavigate();
  const { studentLoginInit, studentLoginVerify, studentResendOtp } = useAuth();
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [maskedPhone, setMaskedPhone] = useState('');
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [resending, setResending] = useState(false);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Step 1: Submit Email & Password to receive OTP
  const handleCredentialsSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    const res = await studentLoginInit(email, password);
    setLoading(false);

    if (res.success && res.requireOtp) {
      setMaskedPhone(res.maskedPhone || '');
      setInfoMessage(res.message || 'OTP sent to your registered mobile number');
      setStep('otp');
      setResendTimer(30);
    } else {
      setError(res.message || 'Invalid student credentials');
    }
  };

  // Step 2: Submit OTP for verification and login
  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setInfoMessage('');

    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length !== 6) {
      setError('Please enter the 6-digit OTP sent to your phone');
      return;
    }

    setLoading(true);
    const res = await studentLoginVerify(email, password, cleanOtp);
    setLoading(false);

    if (res.success && res.role === 'student') {
      navigate('/student/dashboard');
    } else {
      setError(res.message || 'Invalid OTP code. Please try again.');
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (resendTimer > 0 || resending) return;
    setError('');
    setInfoMessage('');
    setResending(true);

    const res = await studentResendOtp(email, password);
    setResending(false);

    if (res.success) {
      setInfoMessage(res.message || 'A new OTP has been sent to your phone.');
      setResendTimer(30);
    } else {
      setError(res.message || 'Failed to resend OTP. Please try again.');
    }
  };

  return (
    <RoleAuthLayout
      accent="bg-purple-600"
      accentSoft="bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300"
      role="student"
      title="Student Login"
      description="Continue your learning journey toward a brighter future."
      icon={Award}
    >
      <AuthError message={error} />

      {infoMessage && (
        <div className="mb-3 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50/80 p-2.5 text-xs text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
          <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>{infoMessage}</span>
        </div>
      )}

      {step === 'credentials' ? (
        /* ─── Step 1: Email + Password Form ─── */
        <form onSubmit={handleCredentialsSubmit} className="space-y-3.5">
          <AuthField label="Email Address">
            <AuthInput
              icon={Mail}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
          </AuthField>
          <AuthField label="Password">
            <PasswordInput
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              showPassword={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              required
            />
          </AuthField>
          <div className="flex items-center justify-between pt-1 text-[10px]">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-3.5 w-3.5 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
              />
              Remember me
            </label>
            <a
              href="#forgot"
              onClick={(event) => event.preventDefault()}
              className="font-semibold text-purple-600 hover:underline dark:text-purple-400"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 transition hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Verifying & Sending OTP...' : 'Continue with OTP'}
          </button>
        </form>
      ) : (
        /* ─── Step 2: 6-Digit SMS OTP Verification Form ─── */
        <form onSubmit={handleOtpSubmit} className="space-y-3.5">
          <div className="rounded-lg border border-purple-100 bg-purple-50/50 p-3 text-center dark:border-purple-900/40 dark:bg-purple-950/30">
            <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              Verification Code Required
            </p>
            <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
              Enter the 6-digit code sent to +91 {maskedPhone || 'your mobile'}
            </p>
          </div>

          <AuthField label="Enter 6-Digit OTP">
            <AuthInput
              icon={KeyRound}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              autoFocus
              required
            />
          </AuthField>

          <div className="flex items-center justify-between text-[10px]">
            <button
              type="button"
              onClick={() => {
                setStep('credentials');
                setOtp('');
                setError('');
                setInfoMessage('');
              }}
              className="flex items-center gap-1 font-medium text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <ArrowLeft className="h-3 w-3" /> Change Credentials
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendTimer > 0 || resending}
              className="flex items-center gap-1 font-semibold text-purple-600 transition hover:underline disabled:text-slate-400 disabled:no-underline dark:text-purple-400 dark:disabled:text-slate-500"
            >
              <RefreshCw className={`h-3 w-3 ${resending ? 'animate-spin' : ''}`} />
              {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full rounded-lg bg-purple-600 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 transition hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Verifying OTP...' : 'Verify OTP & Sign In'}
          </button>
        </form>
      )}

      <div className="mt-4 text-center text-[10px] text-slate-500 dark:text-slate-400">
        New here?{' '}
        <a href="/register/student" className="font-bold text-purple-600 hover:underline dark:text-purple-400">
          Register as Student
        </a>
      </div>
      <ChangeAccountType role="student" />
    </RoleAuthLayout>
  );
};

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { X, Settings, Shield, Bell, Moon, Sun, CheckCircle2 } from 'lucide-react';

export const SettingsModal = ({ onClose }) => {
  const { theme, setTheme, isDark } = useTheme();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white dark:bg-[#111C38] rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-blue-500" />
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Platform Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Appearance Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Theme Mode
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  !isDark
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Sun className="w-5 h-5 text-amber-500" />
                <span className="text-xs">Light Theme</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  isDark
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 text-blue-400 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Moon className="w-5 h-5 text-blue-400" />
                <span className="text-xs">Dark Theme</span>
              </button>
            </div>
          </div>

          {/* Notifications Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Notifications & Alerts
            </h4>
            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/30 cursor-pointer">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Opportunity & Challenge Alerts
                </span>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/30 cursor-pointer">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Interview Reminders (SMS & In-app)
                </span>
                <input
                  type="checkbox"
                  checked={interviewReminders}
                  onChange={(e) => setInterviewReminders(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {saved && (
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Settings updated successfully!
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

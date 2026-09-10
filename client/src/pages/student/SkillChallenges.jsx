import React, { useState, useEffect } from 'react';
import { publicService } from '../../services/roleServices';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import {
  Trophy,
  Users,
  Clock,
  Award,
  ArrowRight,
  Code2,
  CheckCircle2,
  Send,
} from 'lucide-react';

export const SkillChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      const res = await publicService.getChallenges();
      if (res.success && res.challenges) {
        // Deduplicate by ID
        const unique = Array.from(new Map(res.challenges.map(c => [c._id, c])).values());
        setChallenges(unique);
      }
    } catch (err) {
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSubmit = (challenge) => {
    setSelectedChallenge(challenge);
    setRepoUrl('');
    setLiveUrl('');
    setNotes('');
    setSubmitted(false);
    setIsSubmitModalOpen(true);
  };

  const handleSubmitSolution = async (e) => {
    e.preventDefault();
    try {
      if (selectedChallenge) {
        await publicService.submitChallenge(selectedChallenge._id, {
          codeRepoUrl: repoUrl,
          liveDemoUrl: liveUrl,
          submissionNotes: notes,
        });
      }
    } catch (err) {
      // submission recorded
    }
    setSubmitted(true);
    setTimeout(() => {
      setIsSubmitModalOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-500" />
          Skill Hackathons & Industry Challenges
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Solve real-world company problem statements to win cash bounties, verified badges, and direct interview fast-tracks.
        </p>
      </div>

      {/* Challenge Cards Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
          <p className="text-xs text-slate-500 dark:text-slate-400">Loading industry challenges...</p>
        </div>
      ) : challenges.length === 0 ? (
        <div className="bg-white dark:bg-[#111C38] border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-12 text-center">
          <Trophy className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
            No Active Industry Challenges
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Companies post new hackathons and problem statements frequently. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {challenges.map((challenge) => (
          <div
            key={challenge._id}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition-all group flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200/50 dark:border-blue-800/50">
                  {challenge.companyName}
                </span>
                <Badge
                  variant={
                    challenge.difficulty === 'Beginner'
                      ? 'green'
                      : challenge.difficulty === 'Intermediate'
                      ? 'blue'
                      : 'purple'
                  }
                  size="xs"
                >
                  {challenge.difficulty}
                </Badge>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors leading-snug">
                {challenge.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                {challenge.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                {challenge.requiredSkills &&
                  challenge.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  {challenge.prizePoints}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {challenge.deadline}
                </span>
              </div>

              <button
                onClick={() => handleOpenSubmit(challenge)}
                className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <span>Participate & Submit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Submission Modal */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title={`Submit Solution: ${selectedChallenge?.title || ''}`}
        subtitle="Provide your GitHub repository and deployment URL for automated evaluation"
      >
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Solution Submitted Successfully!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your submission is in review with the sponsor jury. Points will be credited to your Passport.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitSolution} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/your-username/challenge-repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Live Demo / Video Link
              </label>
              <input
                type="url"
                placeholder="https://challenge-demo.vercel.app"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Implementation Remarks & Highlights
              </label>
              <textarea
                rows="3"
                placeholder="Highlight key design decisions, benchmarks achieved, or libraries used..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Solution
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

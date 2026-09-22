import React, { useState } from 'react';
import { api } from '../lib/api';
import { User } from '../types';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: (user: User) => void;
  navigate: (path: string) => void;
}

export function AdminLoginPage({ onLoginSuccess, navigate }: AdminLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await api.login({
        email: email.trim(),
        password: password
      });
      onLoginSuccess(data.user);
    } catch (err: any) {
      setError(err.message || 'Invalid admin credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] text-slate-300 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-[#111113] rounded-2xl p-6 sm:p-8 border border-neutral-800 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
            Margalla Hills Admin Portal
          </h1>
          <p className="text-xs text-neutral-400">
            Sign in with your authorized administrator credentials
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3 bg-rose-950/60 border border-rose-800/80 text-rose-300 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Pure Clean Login Form - No Signup, No Autofill, No Extra Options */}
        <form onSubmit={handleLogin} autoComplete="off" className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@margallahills.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-black/60 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-black/60 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer pt-3"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Back to public site */}
        <div className="text-center pt-3 border-t border-neutral-800/80">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-xs text-neutral-500 hover:text-neutral-300 transition cursor-pointer"
          >
            &larr; Return to Website
          </button>
        </div>

      </div>
    </div>
  );
}

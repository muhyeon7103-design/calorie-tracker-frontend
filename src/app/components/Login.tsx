import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/tracker');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#e8755e] rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-[#a4c3a2] rounded-full blur-[100px] animate-float-delayed" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-4 p-4 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg">
            <span className="text-5xl">🥗</span>
          </div>
          <h1 className="text-5xl mb-2 text-[#2a2a2a] tracking-tight">Welcome Back</h1>
          <p className="text-[#7a7a7a] text-lg">Track your nutrition journey</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-[#5a5a5a] ml-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-[#faf7f2] border-2 border-[#e8e5df] rounded-2xl focus:outline-none focus:border-[#e8755e] transition-all duration-300 text-[#2a2a2a]"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm text-[#5a5a5a] ml-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-[#faf7f2] border-2 border-[#e8e5df] rounded-2xl focus:outline-none focus:border-[#e8755e] transition-all duration-300 text-[#2a2a2a]"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#e8755e] to-[#d66550] text-white py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#7a7a7a]">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-[#e8755e] hover:text-[#d66550] transition-colors underline decoration-2 underline-offset-2"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-[#9a9a9a] animate-fade-in-delayed">
          <p>Demo: Use any email and password to continue</p>
        </div>
      </div>
    </div>
  );
}

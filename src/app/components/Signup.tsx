import { useState } from "react";
import { useNavigate } from "react-router";
import { signupUser } from "../../api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dailyCalorieGoal, setDailyCalorieGoal] =
    useState(2000);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signupUser({
        name,
        email,
        password,
        dailyCalorieGoal,
      });

      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#a4c3a2] rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-[#e8755e] rounded-full blur-[100px] animate-float-delayed" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-4 p-4 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg">
            <span className="text-5xl">🌱</span>
          </div>
          <h1 className="text-5xl mb-2 text-[#2a2a2a] tracking-tight">
            Start Your Journey
          </h1>
          <p className="text-[#7a7a7a] text-lg">
            Create your nutrition tracking account
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm text-[#5a5a5a] ml-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-4 bg-[#faf7f2] border-2 border-[#e8e5df] rounded-2xl focus:outline-none focus:border-[#a4c3a2] transition-all duration-300 text-[#2a2a2a]"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm text-[#5a5a5a] ml-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-[#faf7f2] border-2 border-[#e8e5df] rounded-2xl focus:outline-none focus:border-[#a4c3a2] transition-all duration-300 text-[#2a2a2a]"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm text-[#5a5a5a] ml-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-[#faf7f2] border-2 border-[#e8e5df] rounded-2xl focus:outline-none focus:border-[#a4c3a2] transition-all duration-300 text-[#2a2a2a]"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="dailyCalorieGoal"
                className="block text-sm text-[#5a5a5a] ml-1"
              >
                Daily Calorie Goal
              </label>
              <input
                id="dailyCalorieGoal"
                type="number"
                value={dailyCalorieGoal}
                onChange={(e) =>
                  setDailyCalorieGoal(Number(e.target.value))
                }
                className="w-full px-5 py-4 bg-[#faf7f2] border-2 border-[#e8e5df] rounded-2xl focus:outline-none focus:border-[#a4c3a2] transition-all duration-300 text-[#2a2a2a]"
                placeholder="2000"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#a4c3a2] to-[#8db08b] text-white py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#7a7a7a]">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#a4c3a2] hover:text-[#8db08b] transition-colors underline decoration-2 underline-offset-2"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-[#9a9a9a] animate-fade-in-delayed">
          <p>
            Demo: Use any name, email and password to continue
          </p>
        </div>
      </div>
    </div>
  );
}
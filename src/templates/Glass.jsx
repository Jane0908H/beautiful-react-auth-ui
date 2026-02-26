import { useState } from "react";

export default function Glass() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">

      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/30 blur-3xl" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl -top-32 -left-32" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl -bottom-32 -right-32" />

      {/* Glass Card */}
      <div className="relative w-full max-w-md p-12 rounded-3xl
                      bg-white/10 backdrop-blur-2xl
                      border border-white/20
                      shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                      text-white">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md" />
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            Welcome back
          </h2>
          <p className="text-white/60 text-sm mt-3">
            Sign in to your workspace
          </p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm text-white/70 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl
                       bg-white/10 border border-white/20
                       placeholder-white/50
                       focus:outline-none
                       focus:ring-2 focus:ring-white/40
                       focus:bg-white/20
                       transition-all duration-200"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block text-sm text-white/70 mb-2">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl
                       bg-white/10 border border-white/20
                       placeholder-white/50
                       focus:outline-none
                       focus:ring-2 focus:ring-white/40
                       focus:bg-white/20
                       transition-all duration-200"
          />
        </div>

        {/* Primary Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-medium
                     bg-white text-neutral-900
                     hover:bg-white/90
                     active:scale-[0.97]
                     transition-all duration-200
                     shadow-lg shadow-black/30"
        >
          Continue
        </button>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-white/20" />
          <span className="px-4 text-sm text-white/50">or</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Social Buttons */}
        <button className="w-full mb-4 py-3 rounded-xl
                           border border-white/20
                           bg-white/5
                           hover:bg-white/10
                           transition">
          Continue with Google
        </button>

        <button className="w-full py-3 rounded-xl
                           border border-white/20
                           bg-white/5
                           hover:bg-white/10
                           transition">
          Continue with GitHub
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-white/50 mt-10">
          Don’t have an account?{" "}
          <span className="text-white font-medium cursor-pointer hover:underline">
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}
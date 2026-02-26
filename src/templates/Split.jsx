import { useState } from "react";

export default function Split() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-neutral-950">

      {/* Animated Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/30 blur-3xl opacity-40 animate-pulse" />
      <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl -top-40 -left-40" />
      <div className="absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl -bottom-40 -right-40" />

      {/* LEFT SIDE — Brand */}
      <div className="hidden lg:flex w-1/2 relative z-10 flex-col justify-center px-20 text-white">

        <h1 className="text-5xl font-semibold leading-tight tracking-tight">
          Design your <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            future.
          </span>
        </h1>

        <p className="mt-8 text-lg text-white/60 max-w-md">
          A modern workspace built for ambitious teams who want clarity,
          performance, and beauty in every interaction.
        </p>

      </div>

      {/* RIGHT SIDE — Glass Login */}
      <div className="flex w-full lg:w-1/2 items-center justify-center relative z-10 px-6">

        <form className="w-full max-w-md p-12 rounded-3xl
                         bg-white/10 backdrop-blur-2xl
                         border border-white/20
                         shadow-[0_25px_80px_rgba(0,0,0,0.6)]
                         text-white">

          <h2 className="text-3xl font-semibold mb-2 tracking-tight">
            Welcome back
          </h2>
          <p className="text-white/60 mb-10">
            Sign in to continue
          </p>

          {/* Email */}
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl
                         bg-white/10 border border-white/20
                         placeholder-white/40
                         focus:outline-none
                         focus:ring-2 focus:ring-indigo-400/60
                         focus:bg-white/20
                         transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl
                         bg-white/10 border border-white/20
                         placeholder-white/40
                         focus:outline-none
                         focus:ring-2 focus:ring-pink-400/60
                         focus:bg-white/20
                         transition-all duration-200"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-medium
                       bg-gradient-to-r from-indigo-500 to-pink-500
                       hover:opacity-90
                       active:scale-[0.97]
                       transition-all duration-200 shadow-lg shadow-black/30"
          >
            Continue
          </button>

          <p className="text-center text-sm text-white/50 mt-10">
            Don’t have an account?{" "}
            <span className="text-white font-medium hover:underline cursor-pointer">
              Create one
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}
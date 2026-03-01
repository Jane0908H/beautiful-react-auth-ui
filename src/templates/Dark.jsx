import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Dark() {
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ================= PARTICLE SYSTEM ================= */

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const PARTICLE_COUNT = 90;
    const mouse = { x: null, y: null };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.radius = Math.random() * 2 + 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139,92,246,0.8)";
        ctx.shadowColor = "#8b5cf6";
        ctx.shadowBlur = 10;
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x && mouse.y) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            this.x += dx * 0.02;
            this.y += dy * 0.02;
          }
        }

        this.draw();
      }
    }

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = dx * dx + dy * dy;

          if (dist < 14000) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(139,92,246,0.15)";
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      connectParticles();
      requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [shouldReduceMotion]);

  /* ================= UI ================= */

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* Particle Canvas */}
      {!shouldReduceMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />
      )}

      {/* Login Card */}
      <motion.form
        initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 backdrop-blur-3xl bg-white/5 border border-white/20 text-white p-10 rounded-3xl shadow-[0_0_80px_rgba(139,92,246,0.4)] w-96"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          Welcome Back
        </motion.h2>

        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/70 rounded-xl outline-none border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 transition duration-300"
          />
        </div>

        <div className="mb-8">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/70 rounded-xl outline-none border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 transition duration-300"
          />
        </div>

        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: "0px 0px 40px rgba(139,92,246,0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-xl font-semibold tracking-wide"
        >
          Sign In
        </motion.button>
      </motion.form>
    </div>
  );
}
import { useEffect, useRef } from 'react';
import { Users, Book, Video, MessageCircle } from 'lucide-react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        speedZ: Math.random() * 2 + 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(10, 15, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.z -= particle.speedZ;
        if (particle.z <= 0) {
          particle.z = 1000;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        const scale = 1000 / (1000 + particle.z);
        const x2d = (particle.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (particle.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = particle.size * scale;

        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${0.8 * scale})`);
        gradient.addColorStop(0.5, `rgba(14, 165, 233, ${0.5 * scale})`);
        gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #1a1f3a 50%, #0f1829 100%)' }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 -z-10" />

      <header className="relative backdrop-blur-md bg-white/10 border-b border-white/20">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Users className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-200 hover:text-white transition-colors font-medium">
                Home
              </a>
              <a href="#features" className="text-gray-200 hover:text-white transition-colors font-medium">
                Features
              </a>
              <a href="#feed" className="text-gray-200 hover:text-white transition-colors font-medium">
                Feed
              </a>
              <a href="#docs" className="text-gray-200 hover:text-white transition-colors font-medium">
                Docs
              </a>
              <a href="#about" className="text-gray-200 hover:text-white transition-colors font-medium">
                About
              </a>
            </div>

            <div className="flex items-center gap-4">
              <button className="px-6 py-2 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-sm">
                Log In
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-medium">
                Sign Up
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="relative">
        <section className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-white">Dive Into Skill Swap And</span>
              <br />
              <span className="text-white">Connect Effortlessly With</span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                Peers!
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Excited to learn something new while teaching others what you love?
              <br />
              Join Skill Swap today and start connecting with{' '}
              <span className="text-blue-400 font-semibold">like-minded peers!</span>
            </p>

            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2">
              Get Started
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent rounded-3xl blur-3xl opacity-80" />

              <div className="relative h-full flex items-center justify-center">
                <svg viewBox="0 0 400 400" className="w-full h-full filter drop-shadow-2xl">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="1" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
                    </linearGradient>
                  </defs>

                  <g className="animate-pulse" style={{ animation: 'float 6s ease-in-out infinite' }}>
                    <circle cx="100" cy="100" r="50" fill="url(#grad1)" opacity="0.9" />
                    <text x="100" y="110" textAnchor="middle" fontSize="32" fontWeight="bold" fill="white">👨‍💻</text>
                  </g>

                  <g className="animate-pulse" style={{ animation: 'float 6s ease-in-out infinite 1s' }}>
                    <circle cx="300" cy="100" r="50" fill="url(#grad2)" opacity="0.9" />
                    <text x="300" y="110" textAnchor="middle" fontSize="32" fontWeight="bold" fill="white">🎨</text>
                  </g>

                  <g className="animate-pulse" style={{ animation: 'float 6s ease-in-out infinite 2s' }}>
                    <circle cx="100" cy="300" r="50" fill="url(#grad2)" opacity="0.9" />
                    <text x="100" y="310" textAnchor="middle" fontSize="32" fontWeight="bold" fill="white">🎵</text>
                  </g>

                  <g className="animate-pulse" style={{ animation: 'float 6s ease-in-out infinite 1.5s' }}>
                    <circle cx="300" cy="300" r="50" fill="url(#grad1)" opacity="0.9" />
                    <text x="300" y="310" textAnchor="middle" fontSize="32" fontWeight="bold" fill="white">📚</text>
                  </g>

                  <circle cx="200" cy="200" r="35" fill="white" opacity="0.15" stroke="url(#grad1)" strokeWidth="2" />

                  <line x1="150" y1="150" x2="250" y2="250" stroke="url(#grad1)" strokeWidth="2" opacity="0.5" />
                  <line x1="250" y1="150" x2="150" y2="250" stroke="url(#grad2)" strokeWidth="2" opacity="0.5" />

                  <circle cx="200" cy="200" r="25" fill="none" stroke="url(#grad1)" strokeWidth="2" opacity="0.7" />

                  <path d="M 200 175 L 210 195 L 190 195 Z" fill="white" opacity="0.8" />
                  <path d="M 200 225 L 210 205 L 190 205 Z" fill="white" opacity="0.8" />
                  <path d="M 175 200 L 195 210 L 195 190 Z" fill="white" opacity="0.8" />
                  <path d="M 225 200 L 205 210 L 205 190 Z" fill="white" opacity="0.8" />
                </svg>
              </div>

              <style>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-20px); }
                }
              `}</style>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-6">
              <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 border border-white/20 text-center">
                <p className="text-gray-200 text-sm font-medium">
                  <span className="text-blue-300">Learn</span> what you love • <span className="text-orange-300">Teach</span> what you know
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;

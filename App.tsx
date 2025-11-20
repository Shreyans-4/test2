import './index.css';
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

          <div className="relative">
            <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-3xl opacity-60 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-60 animate-pulse" />

              <div className="relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-8 border border-white/10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                    <Video className="w-16 h-16 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                      <Book className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Live Sessions</p>
                      <p className="text-gray-300 text-sm">Connect in real-time</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/20">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Chat & Share</p>
                      <p className="text-gray-300 text-sm">Collaborate seamlessly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Anna M.', teaching: 'Guitar', learning: 'Spanish', color: 'from-pink-500 to-rose-500' },
              { name: 'Raj Patel', teaching: 'Web Dev', learning: 'Digital Art', color: 'from-blue-500 to-cyan-500' },
              { name: 'Sara Lee', teaching: 'French', learning: 'Photography', color: 'from-green-500 to-emerald-500' },
              { name: 'Marco Rossi', teaching: 'Cooking', learning: 'Coding', color: 'from-orange-500 to-red-500' },
            ].map((person, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-24 h-24 bg-gradient-to-br ${person.color} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-2xl transition-shadow`}>
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{person.name}</h3>
                    <p className="text-gray-300 text-sm">
                      <span className="font-semibold text-blue-400">Teaching:</span> {person.teaching}
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="font-semibold text-cyan-400">Learning:</span> {person.learning}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

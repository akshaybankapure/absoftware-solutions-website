import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  Code2,
  Cpu,
  Globe,
  Monitor,
  Terminal,
  ChevronDown
} from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import WireframeScene from './components/WireframeScene';
import ChatWidget from './components/ChatWidget'; // Keeping chat functionality

// ----------------------------------------------------------------------------
// ABsoftware Solutions - v3.0 (Professional / Hybrid)
// ----------------------------------------------------------------------------

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden">
      <CustomCursor />

      {/* 
        NAVIGATION 
        Clean, top-aligned, keeping the brand identity.
      */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono font-bold text-lg tracking-tight cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-brand-accent">{`{`}</span>
            <span>ABsoftware</span>
            <span className="text-brand-accent">{`}`}</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <button onClick={() => scrollTo('work')} className="hover:text-white transition-colors">Work</button>
            <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">Services</button>
            <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">Approach</button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-5 py-2 rounded-full bg-white text-black font-bold hover:bg-brand-accent hover:text-white transition-all transform hover:scale-105"
            >
              Start Project
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505] flex flex-col justify-center px-8">
          <div className="flex flex-col gap-8 text-4xl font-bold tracking-tight">
            <button onClick={() => scrollTo('work')} className="text-left text-gray-400 hover:text-white">Work</button>
            <button onClick={() => scrollTo('services')} className="text-left text-gray-400 hover:text-white">Services</button>
            <button onClick={() => scrollTo('contact')} className="text-left text-brand-accent">Start Project</button>
          </div>
        </div>
      )}

      {/* 
        HERO SECTION 
        Balanced Layout: Content + 3D Visual context
      */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <WireframeScene />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Typography */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-mono text-gray-300">Available for new projects</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8">
              Code for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-neon to-brand-accent bg-[length:200%_auto] animate-gradient">Creative Web.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg mb-10 font-light">
              We bridge the gap between ambitious design and solid engineering.
              Specialized in high-performance web apps for creative studios and forward-thinking startups.
            </p>

            <div className="flex flex-wrap gap-6">
              <button onClick={() => scrollTo('work')} className="group flex items-center gap-3 px-8 py-4 bg-brand-accent text-white rounded-full font-bold text-lg hover:bg-brand-neon transition-all hover:scale-105 shadow-lg shadow-brand-accent/20">
                View Work <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollTo('contact')} className="flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full font-medium text-lg hover:bg-white/5 transition-all">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Column: Space for 3D Visual (which is absolutely positioned but conceptually here) */}
          <div className="hidden lg:block h-[600px] w-full pointer-events-none">
            {/* The WireframeScene covers this area visually */}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <ChevronDown size={14} />
        </div>
      </section>

      {/* 
        Selected Work 
        Detailed cards, professional presentation.
      */}
      <section id="work" className="py-32 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Selected Works</h2>
              <p className="text-gray-400 max-w-md">Engineering feats that define our standard of quality.</p>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-white/20"></div>
          </div>

          <div className="space-y-40">
            {/* Project 1 */}
            <div className="group grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-brand-accent/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                  <Monitor size={64} className="stroke-1 text-white" />
                </div>
              </div>
              <div>
                <span className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-4 block">Streaming Infrastructure</span>
                <h3 className="text-3xl md:text-5xl font-bold mb-6">Nebula Stream</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  A Twitch competitor built for the creator economy. We handled the entire backend architecture using Golang and a custom WebRTC implementation to achieve sub-second latency for 100k+ concurrent users.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {["Golang", "WebRTC", "React", "AWS"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                  <div>
                    <div className="text-2xl font-bold font-mono text-white">{'<'}500ms</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Latency</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-white">150k+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Users</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group grid lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
              <div className="lg:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-brand-neon/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-neon/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                  <Code2 size={64} className="stroke-1 text-white" />
                </div>
              </div>
              <div className="lg:order-1">
                <span className="font-mono text-xs text-brand-neon uppercase tracking-widest mb-4 block">Fintech Visualisation</span>
                <h3 className="text-3xl md:text-5xl font-bold mb-6">Quant AI</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Real-time visualization dashboard for high-frequency trading. We utilized WebGL to render millions of data points at 60fps, giving traders an edge that standard DOM elements couldn't provide.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {["WebGL", "Three.js", "Next.js", "Redis"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                  <div>
                    <div className="text-2xl font-bold font-mono text-white">2M+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Data Points/Sec</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-white">60fps</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Performance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        SERVICES
        Grid layout, clean icons.
      */}
      <section id="services" className="py-32 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 text-center">Core Capabilities</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#050505] border border-white/5 hover:border-brand-accent/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-brand-accent/10 flex items-center justify-center mb-6 text-brand-accent group-hover:scale-110 transition-transform">
                <Terminal size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Creative Development</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                We don't do templates. We build custom, bespoke interactive experiences using WebGL, Canvas, and Framer Motion that separate you from the competition.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#050505] border border-white/5 hover:border-brand-neon/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-brand-neon/10 flex items-center justify-center mb-6 text-brand-neon group-hover:scale-110 transition-transform">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">System Architecture</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Scalable backend systems designed for high availability. We utilize microservices, serverless functions, and edge computing to ensure speed and reliability.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#050505] border border-white/5 hover:border-blue-500/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">AI Integration</h3>
              <p className="text-gray-400 leading-relaxed font-light">
                Future-proof your business by integrating LLMs and custom AI agents directly into your product workflows. From RAG pipelines to autonomous assistants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        CONTACT
        Simple, clean, centered.
      */}
      <section id="contact" className="py-32 container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Let's build the <br /><span className="text-gray-500">extraordinary.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 font-light">
            We limit our active client roster to ensure maximum focus. <br className="hidden md:block" />
            Currently accepting 2 new partners for Q1 2025.
          </p>

          <a
            href="mailto:contact@absoftz.in"
            className="inline-block text-3xl md:text-5xl font-bold hover:text-brand-accent transition-colors border-b border-white/10 pb-4 mb-16"
          >
            contact@absoftz.in
          </a>

          <div className="flex justify-center gap-8 text-sm font-mono text-gray-500 uppercase tracking-widest">
            <span>Bangalore, IN</span>
            <span>•</span>
            <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}</span>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-white/5 text-center text-gray-600 text-xs font-mono">
        © 2024 ABsoftware Solutions. All Rights Reserved.
      </footer>

      {/* Chat Widget always present */}
      <ChatWidget theme="dark" />
    </div>
  );
}

export default App;
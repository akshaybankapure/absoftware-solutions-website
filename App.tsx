import React, { useState, useEffect } from 'react';
import {
  Rocket,
  Layout,
  Users,
  ArrowRight,
  Monitor,
  Terminal,
  Cpu,
  Globe,
  Menu,
  X,
  Sun,
  Moon,
  ChevronLeft,
  ExternalLink,
  Code2,
  Database,
  Layers,
  Mail,
  MapPin
} from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import ProfessionalBackground from './components/ProfessionalBackground';
import ChatWidget from './components/ChatWidget';

// --- SUB-COMPONENTS FOR PAGES ---

// 1. HOME VIEW
const HomeView = ({ navigate }: { navigate: (page: string) => void }) => {
  const clients = [
    { name: "Neon Studio", type: "Creative Agency" },
    { name: "Flux Corp", type: "Enterprise" },
    { name: "Alpha Start", type: "Series A Startup" },
    { name: "Bold Vision", type: "Design House" }
  ];

  return (
    <>
      <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-sm border-current opacity-60">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-mono">Available for new projects</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] mb-8">
              Code for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-neon to-blue-500 animate-pulse-slow">
                Creative Web.
              </span>
            </h1>

            <p className="text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 opacity-80 font-light">
              We bridge the gap between ambitious design and solid engineering.
              Specialized in high-performance web apps for creative studios and forward-thinking startups.
            </p>

            <div className="flex flex-wrap gap-6 mb-16">
              <button onClick={() => navigate('contact')} className="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 bg-brand-accent text-white hover:bg-brand-neon shadow-lg hover:shadow-brand-accent/25">
                Build with us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate('work')} className="flex items-center gap-3 px-8 py-4 border rounded-full font-medium text-lg transition-all hover:bg-current/10 border-current opacity-80 hover:opacity-100">
                View Showcase
              </button>
            </div>

            {/* Stats / Trust Indicators - Clean & Minimal */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-t border-current/10 opacity-70">
              <div>
                <div className="text-4xl font-bold font-mono tracking-tight">100+</div>
                <div className="text-xs uppercase tracking-widest mt-2 opacity-60">Projects Shipped</div>
              </div>
              <div>
                <div className="text-4xl font-bold font-mono tracking-tight">98%</div>
                <div className="text-xs uppercase tracking-widest mt-2 opacity-60">Client Retention</div>
              </div>
              <div className="hidden md:block">
                <div className="text-4xl font-bold font-mono tracking-tight">4.9/5</div>
                <div className="text-xs uppercase tracking-widest mt-2 opacity-60">Clutch Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-float">
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-current to-transparent"></div>
        </div>
      </section>

      {/* Ticker / Client Banner */}
      <div className="w-full border-y py-10 overflow-hidden border-current/5 bg-current/2 backdrop-blur-sm">
        <div className="flex whitespace-nowrap gap-20 animate-marquee">
          {[...clients, ...clients, ...clients].map((client, i) => (
            <div key={i} className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity cursor-default">
              <span className="text-3xl font-bold font-mono tracking-tighter">{client.name}</span>
              <span className="text-[10px] px-2 py-1 rounded border border-current opacity-50 uppercase tracking-widest">{client.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Intro to Flows */}
      <section className="py-32 container mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div onClick={() => navigate('work')} className="group cursor-pointer p-10 border border-current/10 rounded-3xl hover:bg-current/5 transition-all hover:border-brand-accent/20">
          <Monitor className="w-12 h-12 mb-6 text-brand-accent opacity-80 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">Work <ArrowRight size={18} className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-brand-accent" /></h3>
          <p className="opacity-60 text-sm leading-relaxed">Explore our selected case studies and engineering feats.</p>
        </div>
        <div onClick={() => navigate('services')} className="group cursor-pointer p-10 border border-current/10 rounded-3xl hover:bg-current/5 transition-all hover:border-brand-neon/20">
          <Cpu className="w-12 h-12 mb-6 text-brand-neon opacity-80 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">Services <ArrowRight size={18} className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-brand-neon" /></h3>
          <p className="opacity-60 text-sm leading-relaxed">From MVPs to Enterprise AI Agents. We build it all.</p>
        </div>
        <div onClick={() => navigate('approach')} className="group cursor-pointer p-10 border border-current/10 rounded-3xl hover:bg-current/5 transition-all hover:border-blue-500/20">
          <Terminal className="w-12 h-12 mb-6 text-blue-500 opacity-80 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">Approach <ArrowRight size={18} className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-blue-500" /></h3>
          <p className="opacity-60 text-sm leading-relaxed">Our technical philosophy and "0 to 1" methodology.</p>
        </div>
      </section>
    </>
  );
};

// 2. WORK VIEW (Detailed Portfolio)
const WorkView = ({ navigate }: { navigate: (page: string) => void }) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      id: 1,
      title: "Nebula Stream",
      category: "Media Platform",
      tagline: "Ultra-low latency streaming for the creator economy.",
      desc: "Nebula Stream challenged us to build a Twitch competitor with <1s latency for 100k+ concurrent users. We engineered a custom WebRTC implementation on top of a Go-based edge network.",
      stats: [
        { label: "Latency", value: "< 500ms" },
        { label: "Concurrent Users", value: "150k+" },
        { label: "Uptime", value: "99.99%" }
      ],
      stack: ["React", "WebRTC", "Golang", "AWS"],
      gradient: "from-purple-500/20 to-blue-500/20"
    },
    {
      id: 2,
      title: "Quant AI",
      category: "Fintech Dashboard",
      tagline: "Predictive analytics for high-frequency trading.",
      desc: "A Bloomberg-killer interface. We visualized millions of data points in real-time using WebGL and WebSockets, providing traders with split-second actionable insights.",
      stats: [
        { label: "Data Points/Sec", value: "2M+" },
        { label: "Render Time", value: "60fps" },
        { label: "Accuracy", value: "99.8%" }
      ],
      stack: ["Next.js", "WebGL", "Python", "Redis"],
      gradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
      id: 3,
      title: "Velvet Space",
      category: "3D E-commerce",
      tagline: "Immersive luxury shopping experience.",
      desc: "We brought the showroom to the browser. Using Three.js and React Fiber, users can customize furniture in 3D with realistic lighting and physics before buying.",
      stats: [
        { label: "Conversion Rate", value: "+45%" },
        { label: "Avg Session", value: "12m" },
        { label: "Returns", value: "-20%" }
      ],
      stack: ["React Fiber", "Shopify", "Blender", "Vercel"],
      gradient: "from-orange-500/20 to-red-500/20"
    }
  ];

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => navigate('home')} className="p-3 rounded-full border border-current/20 hover:bg-current/10 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Selected Works</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Project List */}
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden ${selectedProject?.id === project.id ? 'border-brand-accent bg-brand-accent/5' : 'border-current/10 hover:border-current/30 hover:bg-current/5'}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-3 block">{project.category}</span>
              <h2 className="text-3xl font-bold mb-2 tracking-tight">{project.title}</h2>
              <p className="opacity-70 mb-6 font-light">{project.tagline}</p>
              <div className="flex gap-2">
                {project.stack.map(tech => (
                  <span key={tech} className="text-[10px] px-2 py-1.5 rounded-md bg-current/5 border border-current/10 font-mono tracking-wide">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail View (Sticky) */}
        <div className="hidden lg:block relative">
          <div className="sticky top-32 p-10 rounded-3xl border border-current/10 backdrop-blur-md bg-current/5 min-h-[600px] flex flex-col justify-between shadow-2xl shadow-black/5">
            {selectedProject ? (
              <div className="animate-fade-in">
                <div className={`w-full h-56 rounded-2xl mb-10 bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center relative overflow-hidden group`}>
                  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
                  <Code2 className="w-16 h-16 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">{selectedProject.title}</h2>
                <p className="text-lg leading-relaxed opacity-80 mb-10 font-light">{selectedProject.desc}</p>

                <div className="grid grid-cols-3 gap-4 mb-10">
                  {selectedProject.stats.map((stat: any, idx: number) => (
                    <div key={idx} className="p-5 rounded-2xl bg-current/5 border border-current/5">
                      <div className="text-[10px] uppercase tracking-widest opacity-50 mb-2">{stat.label}</div>
                      <div className="text-2xl font-mono font-bold text-brand-accent">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <button className="w-full py-5 bg-current text-brand-primary font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-lg">
                  View Live Case Study <ExternalLink size={20} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full opacity-30 text-center">
                <Monitor className="w-24 h-24 mb-6 stroke-1" />
                <p className="text-xl font-light">Select a project to view dossier.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. SERVICES VIEW
const ServicesView = ({ navigate }: { navigate: (page: string) => void }) => {
  const services = [
    {
      icon: <Rocket className="w-12 h-12 text-brand-neon" />,
      title: "Rapid MVPs & POCs",
      desc: "We specialize in the '0 to 1' journey. We take your napkin sketch and turn it into a deployable, scalable product in weeks, not months.",
      features: ["Product Discovery", "Rapid Prototyping", "Go-to-Market Strategy", "React/Next.js Architecture"]
    },
    {
      icon: <Database className="w-12 h-12 text-blue-500" />,
      title: "Enterprise Web Apps",
      desc: "Heavy-duty applications for complex workflows. We build internal tools, SaaS platforms, and dashboards that can handle millions of operations.",
      features: ["Microservices", "Real-time Data (WebSockets)", "Role-Based Access Control", "Cloud Infrastructure (AWS/GCP)"]
    },
    {
      icon: <Cpu className="w-12 h-12 text-green-500" />,
      title: "AI & LLM Integration",
      desc: "Future-proof your business with custom AI agents. We integrate OpenAI, Gemini, and custom models directly into your workflow.",
      features: ["RAG Pipelines", "Custom Chatbots", "Automated Workflows", "Vector Databases"]
    }
  ];

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => navigate('home')} className="p-3 rounded-full border border-current/20 hover:bg-current/10 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Capabilities</h1>
      </div>

      <div className="grid gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="glass-panel p-12 rounded-3xl border border-current/10 hover:border-brand-accent/30 transition-all group">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="p-8 rounded-3xl bg-current/5 group-hover:scale-105 transition-transform duration-500">
                {service.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 tracking-tight">{service.title}</h2>
                <p className="text-xl opacity-70 mb-8 leading-relaxed max-w-3xl font-light">{service.desc}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
                      <span className="font-mono text-sm opacity-80">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:flex flex-col justify-center h-full">
                <button onClick={() => navigate('contact')} className="px-8 py-4 rounded-full border border-current/20 hover:bg-current/10 font-bold whitespace-nowrap hover:scale-105 transition-all">
                  Book This
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. APPROACH / ABOUT VIEW
const ApproachView = ({ navigate }: { navigate: (page: string) => void }) => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => navigate('home')} className="p-3 rounded-full border border-current/20 hover:bg-current/10 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">The Protocol</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h2 className="text-4xl font-bold mb-8 text-brand-accent tracking-tighter">Engineering is not a commodity. <br />It's an art form.</h2>
          <p className="text-xl opacity-70 leading-relaxed mb-8 font-light">
            At ABsoftware, we reject the "body shop" mentality. We don't just throw developers at a problem. We deploy elite engineering squads that function as a cohesive unit.
          </p>
          <p className="text-xl opacity-70 leading-relaxed font-light">
            Our philosophy is built on the concept of <span className="text-brand-neon font-medium">Radical Ownership</span>. Every line of code we write is treated as if it were for our own product.
          </p>
        </div>
        <div className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-current/10 glass-panel flex items-center justify-center bg-current/5">
          {/* Abstract visual representation of process */}
          <div className="grid grid-cols-2 gap-8 p-8">
            <div className="p-8 bg-current/5 rounded-3xl animate-pulse-slow border border-current/5 backdrop-blur-sm">
              <Terminal className="w-10 h-10 mb-4 text-blue-500" />
              <div className="h-2 w-24 bg-current/20 rounded-full mb-2"></div>
              <div className="h-2 w-16 bg-current/20 rounded-full"></div>
            </div>
            <div className="p-8 bg-current/5 rounded-3xl animate-pulse-slow border border-current/5 backdrop-blur-sm" style={{ animationDelay: '1s' }}>
              <Layers className="w-10 h-10 mb-4 text-purple-500" />
              <div className="h-2 w-24 bg-current/20 rounded-full mb-2"></div>
              <div className="h-2 w-16 bg-current/20 rounded-full"></div>
            </div>
            <div className="p-8 bg-current/5 rounded-3xl animate-pulse-slow border border-current/5 backdrop-blur-sm" style={{ animationDelay: '2s' }}>
              <Globe className="w-10 h-10 mb-4 text-green-500" />
              <div className="h-2 w-24 bg-current/20 rounded-full mb-2"></div>
              <div className="h-2 w-16 bg-current/20 rounded-full"></div>
            </div>
            <div className="p-8 bg-current/5 rounded-3xl animate-pulse-slow border border-current/5 backdrop-blur-sm" style={{ animationDelay: '3s' }}>
              <Cpu className="w-10 h-10 mb-4 text-orange-500" />
              <div className="h-2 w-24 bg-current/20 rounded-full mb-2"></div>
              <div className="h-2 w-16 bg-current/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-l border-current/20 pl-12 space-y-20 ml-6 max-w-4xl">
        <div className="relative group">
          <div className="absolute -left-[61px] top-1 w-10 h-10 rounded-full bg-brand-dark border-2 border-brand-accent flex items-center justify-center z-10">
            <div className="w-3 h-3 bg-brand-accent rounded-full group-hover:scale-125 transition-transform" />
          </div>
          <h3 className="text-3xl font-bold mb-4 tracking-tight">Phase 1: Discovery & Architecture</h3>
          <p className="text-lg opacity-70 leading-relaxed font-light">We deep dive into your business logic. We don't write a single line of code until we have a solid architectural diagram and a clear roadmap. This prevents technical debt before it even starts.</p>
        </div>
        <div className="relative group">
          <div className="absolute -left-[61px] top-1 w-10 h-10 rounded-full bg-brand-dark border-2 border-brand-neon flex items-center justify-center z-10">
            <div className="w-3 h-3 bg-brand-neon rounded-full group-hover:scale-125 transition-transform" />
          </div>
          <h3 className="text-3xl font-bold mb-4 tracking-tight">Phase 2: Agile Development Sprints</h3>
          <p className="text-lg opacity-70 leading-relaxed font-light">Two-week sprints with tangible deliverables. You see progress every step of the way. CI/CD pipelines are set up on Day 1, ensuring we are always ready to deploy.</p>
        </div>
        <div className="relative group">
          <div className="absolute -left-[61px] top-1 w-10 h-10 rounded-full bg-brand-dark border-2 border-blue-500 flex items-center justify-center z-10">
            <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:scale-125 transition-transform" />
          </div>
          <h3 className="text-3xl font-bold mb-4 tracking-tight">Phase 3: Launch & Scale</h3>
          <p className="text-lg opacity-70 leading-relaxed font-light">Production deployment is just the beginning. We monitor performance, optimize database queries, and ensure your app scales with your user base.</p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const navigate = (page: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
    setMenuOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-brand-dark text-white' : 'bg-brand-light text-brand-primary'} selection:bg-brand-accent selection:text-white`}>
      <CustomCursor />

      {/* 3D Background - Enterprise Grade */}
      <ProfessionalBackground theme={theme} />

      <ChatWidget theme={theme} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled
        ? (theme === 'dark' ? 'bg-brand-dark/80 border-b border-white/5' : 'bg-white/90 border-b border-black/5 shadow-sm') + ' backdrop-blur-md py-4'
        : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-2 font-mono font-bold text-xl tracking-tighter cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <span className={`transition-colors ${theme === 'dark' ? 'text-brand-accent group-hover:text-white' : 'text-blue-600 group-hover:text-black'}`}>{`{`}</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>ABsoftware</span>
            <span className={`transition-colors ${theme === 'dark' ? 'text-brand-accent group-hover:text-white' : 'text-blue-600 group-hover:text-black'}`}>{`}`}</span>
          </div>

          <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
            <button onClick={() => navigate('work')} className={`transition-colors ${currentPage === 'work' ? 'text-brand-accent' : ''} hover:text-current opacity-80 hover:opacity-100`}>Work</button>
            <button onClick={() => navigate('services')} className={`transition-colors ${currentPage === 'services' ? 'text-brand-accent' : ''} hover:text-current opacity-80 hover:opacity-100`}>Services</button>
            <button onClick={() => navigate('approach')} className={`transition-colors ${currentPage === 'approach' ? 'text-brand-accent' : ''} hover:text-current opacity-80 hover:opacity-100`}>Approach</button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-white/10 text-yellow-400' : 'hover:bg-black/5 text-slate-900'}`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => navigate('contact')}
              className={`px-6 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 ${theme === 'dark' ? 'bg-white text-black hover:bg-brand-accent hover:text-white' : 'bg-black text-white hover:bg-blue-600'}`}
            >
              Start Project
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="text-current">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="text-current" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className={`fixed inset-0 z-30 flex flex-col items-center justify-center space-y-8 md:hidden ${theme === 'dark' ? 'bg-brand-dark' : 'bg-brand-light'}`}>
          <button onClick={() => navigate('work')} className="text-2xl font-bold">Work</button>
          <button onClick={() => navigate('services')} className="text-2xl font-bold">Services</button>
          <button onClick={() => navigate('approach')} className="text-2xl font-bold">Approach</button>
          <button onClick={() => navigate('contact')} className="px-8 py-3 bg-brand-accent rounded-full text-white text-xl font-bold">Let's Talk</button>
        </div>
      )}

      {/* MAIN CONTENT AREA - SWITCHER */}
      <main className="relative z-10 transition-opacity duration-500 ease-in-out">
        {currentPage === 'home' && <HomeView navigate={navigate} />}
        {currentPage === 'work' && <WorkView navigate={navigate} />}
        {currentPage === 'services' && <ServicesView navigate={navigate} />}
        {currentPage === 'approach' && <ApproachView navigate={navigate} />}

        {currentPage === 'contact' && (
          <section className="pt-32 pb-20 container mx-auto px-6 min-h-screen flex flex-col items-center justify-center">

            <div className="max-w-4xl text-center mb-16 animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Let's Build Something <br />
                <span className="text-brand-accent">Extraordinary.</span>
              </h2>
              <p className="text-xl opacity-70 max-w-2xl mx-auto leading-relaxed font-light">
                Whether you need a rapid MVP or a scalable enterprise solution, our engineering squad is ready to deploy.
              </p>
            </div>

            <div className={`p-12 rounded-[2.5rem] border w-full max-w-2xl backdrop-blur-xl shadow-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10 shadow-indigo-500/10' : 'bg-black/5 border-black/10 shadow-xl'}`}>
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="p-5 rounded-2xl bg-brand-accent/20 text-brand-accent">
                    <Mail size={28} />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-widest font-mono opacity-50 mb-1">Email Us</div>
                    <a href="mailto:contact@absoftz.in" className="text-xl font-bold hover:text-brand-accent transition-colors">
                      contact@absoftz.in
                    </a>
                  </div>
                </div>

                <div className="h-12 w-[1px] bg-current/10 hidden md:block"></div>

                <div className="flex items-center gap-5">
                  <div className="p-5 rounded-2xl bg-brand-neon/20 text-brand-neon">
                    <MapPin size={28} />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-widest font-mono opacity-50 mb-1">Located In</div>
                    <div className="text-xl font-bold">Bangalore, India</div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-current/10">
                <p className="opacity-60 mb-6 text-sm text-center">Or schedule a free 15-minute technical consultation:</p>
                <button className="w-full py-5 rounded-2xl bg-brand-accent text-white font-bold text-lg hover:bg-brand-neon transition-all hover:scale-[1.01] shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2">
                  Schedule Google Meet <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate('home')}
              className="mt-16 flex items-center gap-2 text-sm opacity-50 hover:opacity-100 transition-opacity py-2 px-6 rounded-full border border-transparent hover:border-current/20 hover:bg-current/5"
            >
              <ChevronLeft size={16} /> Back to Home
            </button>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className={`py-12 border-t text-sm ${theme === 'dark' ? 'border-white/5 text-gray-500' : 'border-black/5 text-slate-500'}`}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono">© 2024 ABsoftware Solutions.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-accent transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-accent transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-accent transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
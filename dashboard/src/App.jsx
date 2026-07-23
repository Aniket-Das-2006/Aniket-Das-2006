import React, { useState } from 'react';
import { Terminal, Gamepad2, Sun, Heart, Sparkles, BookOpen, User, FolderGit2, ExternalLink, Code2, Database, BarChart3, Brain, Trophy, Mic, Edit3, Star, Bot, Globe, Zap, Cpu } from 'lucide-react';
import BrickBreaker from './components/BrickBreaker';
import Snake from './components/Snake';
import WeatherClock from './components/WeatherClock';
import Painter from './components/Painter';

// Custom inline SVG icons for social links to avoid lucide-react brand icon export issues
const Github = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedGame, setSelectedGame] = useState('brick');

  const skills = [
    { name: 'Python & Data Science', level: 90, icon: <Code2 size={14} />, color: '#3b82f6' },
    { name: 'SQL & Database Eng.', level: 85, icon: <Database size={14} />, color: '#818cf8' },
    { name: 'React & Web Dev', level: 80, icon: <Code2 size={14} />, color: '#c4b5fd' },
    { name: 'Tableau & Power BI', level: 88, icon: <BarChart3 size={14} />, color: '#06b6d4' },
    { name: 'Machine Learning & AI', level: 75, icon: <Brain size={14} />, color: '#10b981' },
  ];

  const projects = [
    {
      title: 'Agentic RAG Pipeline',
      description: 'Multi-agent orchestration system using LangGraph and ChromaDB for intelligent document retrieval with fallback web search.',
      tags: ['Python', 'LangGraph', 'ChromaDB', 'OpenAI'],
      color: '#3b82f6',
      icon: <Bot size={22} />,
      stars: 24,
      link: 'https://github.com/Aniket-Das-2006/Agentic-RAG-Pipeline',
    },
    {
      title: 'Real-Time Analytics Dashboard',
      description: 'Live streaming pipeline with Kafka, Spark, and PostgreSQL, visualized through an interactive React dashboard.',
      tags: ['Kafka', 'Spark', 'PostgreSQL', 'React'],
      color: '#818cf8',
      icon: <BarChart3 size={22} />,
      stars: 18,
      link: 'https://github.com/Aniket-Das-2006/Real-Time-Analytics-Dashboard',
    },
    {
      title: 'Neural Profile Hub',
      description: 'This very dashboard — a futuristic developer portfolio with live weather, retro arcade games, and interactive canvas art.',
      tags: ['React', 'Vite', 'Canvas API', 'Open-Meteo'],
      color: '#c4b5fd',
      icon: <Globe size={22} />,
      stars: 31,
      link: 'https://github.com/Aniket-Das-2006/Aniket-Das-2006',
    },
    {
      title: 'SQL Query Optimizer',
      description: 'AI-powered SQL query analysis tool that detects anti-patterns and suggests index optimizations using static analysis.',
      tags: ['Python', 'SQL', 'Streamlit', 'ML'],
      color: '#06b6d4',
      icon: <Database size={22} />,
      stars: 12,
      link: 'https://github.com/Aniket-Das-2006/SQL-Query-Optimizer',
    },
    {
      title: 'Sentiment Intelligence Engine',
      description: 'Fine-tuned BERT classifier for multilingual sentiment analysis deployed as a REST API with a live inference UI.',
      tags: ['PyTorch', 'BERT', 'FastAPI', 'Docker'],
      color: '#10b981',
      icon: <Brain size={22} />,
      stars: 20,
      link: 'https://github.com/Aniket-Das-2006/Sentiment-Intelligence-Engine',
    },
    {
      title: 'Open-Claw LLM Wrapper',
      description: 'Unified Python SDK for multiple LLM providers (OpenAI, Gemini, Claude) with streaming, retry logic, and cost tracking.',
      tags: ['Python', 'OpenAI', 'Gemini', 'Claude'],
      color: '#f59e0b',
      icon: <Zap size={22} />,
      stars: 45,
      link: 'https://github.com/Aniket-Das-2006/Open-Claw-LLM-Wrapper',
    },
  ];

  const navItems = [
    { id: 'profile', label: 'Profile Hub', icon: <User size={15} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={15} /> },
    { id: 'arcade', label: 'Neon Arcade', icon: <Gamepad2 size={15} /> },
    { id: 'live', label: 'Live Stations', icon: <Sun size={15} /> },
    { id: 'canvas', label: 'Cyber Canvas', icon: <Sparkles size={15} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* Background ambient blobs */}
      <div style={{ position: 'fixed', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', top: '8%', left: '3%', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(196,181,253,0.10) 0%, transparent 70%)', bottom: '10%', right: '3%', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Sticky Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 36px',
        background: 'rgba(7, 10, 19, 0.80)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(129, 140, 248, 0.1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.35rem', fontWeight: '800', letterSpacing: '0.3px' }}>
            aniket<span className="text-gradient">das</span>
          </span>
          <span style={{ fontSize: '0.6rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-blue)', letterSpacing: '2.5px', fontFamily: 'var(--font-mono)' }}>
            Data Science & AI • IIM Sambalpur
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`neon-btn ${activeTab === item.id ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.8rem' }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Socials */}
        <div style={{ display: 'flex', gap: '14px' }}>
          <a
            href="https://github.com/Aniket-Das-2006"
            target="_blank" rel="noreferrer"
            title="GitHub"
            style={{ color: 'var(--accent-lavender)', transition: 'color 0.2s, transform 0.2s', display: 'flex' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--accent-lavender)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/aniket-das-921b24334/"
            target="_blank" rel="noreferrer"
            title="LinkedIn"
            style={{ color: 'var(--accent-lavender)', transition: 'color 0.2s, transform 0.2s', display: 'flex' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--accent-lavender)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Linkedin size={20} />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '36px 20px', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: '1040px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* PROFILE TAB                                                  */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Hero Panel */}
              <div className="glass-panel" style={{ padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: '800', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '3px', fontFamily: 'var(--font-mono)' }}>
                    &gt; initializing_profile.sh
                  </span>
                  <h1 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#fff', margin: '10px 0 14px', lineHeight: 1.1 }} className="text-gradient">
                    Aniket Das
                  </h1>
                  <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '0.97rem', maxWidth: '560px' }}>
                    Undergraduate at{' '}
                    <strong style={{ color: '#fff' }}>IIM Sambalpur</strong>
                    {' '}(Batch of 2029), majoring in{' '}
                    <strong style={{ color: 'var(--accent-lavender)' }}>Data Science &amp; AI</strong>.
                    Engineering intelligent applications at the intersection of advanced database pipelines,
                    agentic AI orchestration, and dynamic visual design.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                    {['Agentic AI', 'RAG Pipelines', 'Open-Claw', 'VibeCoding'].map((tag, i) => {
                      const colors = ['#a855f7', '#06b6d4', '#10b981', '#ec4899'];
                      return (
                        <span key={tag} style={{
                          padding: '4px 14px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: '700',
                          border: `1px solid ${colors[i]}55`,
                          background: `${colors[i]}18`,
                          color: colors[i],
                          fontFamily: 'var(--font-mono)'
                        }}>{tag}</span>
                      );
                    })}
                  </div>
                </div>

                {/* Pulsing Avatar */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <div className="glow-active" style={{
                    width: '110px', height: '110px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(196,181,253,0.15))',
                    border: '2px solid rgba(129,140,248,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(129,140,248,0.2), inset 0 0 20px rgba(59,130,246,0.05)',
                    overflow: 'hidden'
                  }}>
                    <img src="https://github.com/Aniket-Das-2006.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Aniket Das" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>STATUS</div>
                    <div style={{ fontSize: '0.7rem', color: '#10b981', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>● ACTIVE</div>
                  </div>
                </div>
              </div>

              {/* Two-Column Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>

                {/* Academic Timeline */}
                <div className="glass-panel" style={{ padding: '26px' }}>
                  <h3 style={{ fontSize: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                    <BookOpen size={17} color="var(--accent-blue)" />
                    Academic Timeline
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    <div style={{ position: 'relative', paddingLeft: '22px', borderLeft: '2px solid rgba(59,130,246,0.3)' }}>
                      <span style={{ position: 'absolute', left: '-5px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)', boxShadow: '0 0 10px var(--accent-blue)' }} />
                      <h4 style={{ fontSize: '0.9rem', color: '#fff', fontWeight: '700' }}>IIM Sambalpur</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--accent-lavender)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>B.S. Data Science &amp; AI + Management</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '3px' }}>2025 – 2029 • Currently Enrolled</p>
                    </div>
                    <div style={{ position: 'relative', paddingLeft: '22px', borderLeft: '2px solid rgba(129,140,248,0.15)' }}>
                      <span style={{ position: 'absolute', left: '-5px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(129,140,248,0.5)' }} />
                      <h4 style={{ fontSize: '0.9rem', color: '#fff', fontWeight: '700' }}>IIT Madras</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>Data Science &amp; Applications</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '3px' }}>Foundation Studies • Completed</p>
                    </div>
                  </div>
                </div>

                {/* Creative Accomplishments */}
                <div className="glass-panel" style={{ padding: '26px' }}>
                  <h3 style={{ fontSize: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                    <Heart size={17} color="var(--accent-blue)" />
                    Creative Accomplishments
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { icon: <Mic size={18} color="var(--accent-lavender)" />, title: '3× State Singing Champion', sub: 'Vocal excellence & performance accolades across West Bengal' },
                      { icon: <Edit3 size={18} color="var(--accent-lavender)" />, title: '4× Bengal Writer Awardee', sub: 'Creative literature & published content recognition' },
                      { icon: <Trophy size={18} color="var(--accent-lavender)" />, title: 'Hackathon Finalist', sub: 'National-level AI innovation competition, Top 10' },
                    ].map(item => (
                      <div key={item.title} style={{
                        display: 'flex', gap: '12px', alignItems: 'flex-start',
                        background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)',
                        borderRadius: '12px', padding: '12px'
                      }}>
                        <span style={{ display: 'flex', marginTop: '3px' }}>{item.icon}</span>
                        <div>
                          <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '600', display: 'block' }}>{item.title}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px', display: 'block' }}>{item.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills Progress Bars */}
              <div className="glass-panel" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Terminal size={17} color="var(--accent-blue)" />
                  Technical Proficiency Stack
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {skills.map((s, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--accent-lavender)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: s.color }}>{s.icon}</span>
                          {s.name}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>{s.level}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${s.level}%`, height: '100%', borderRadius: '999px',
                          background: `linear-gradient(90deg, ${s.color}, ${s.color}99)`,
                          boxShadow: `0 0 8px ${s.color}66`,
                          transition: 'width 0.8s ease'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub Stats Embed */}
              <div className="glass-panel" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Github size={17} color="var(--accent-blue)" />
                  GitHub Contribution Metrics
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    src="https://github-readme-stats-sigma-five.vercel.app/api?username=Aniket-Das-2006&show_icons=true&bg_color=0d1117&title_color=818cf8&text_color=c4b5fd&icon_color=3b82f6&border_color=1e293b&ring_color=818cf8&hide_border=false&count_private=true&rank_icon=github"
                    alt="Aniket GitHub Stats"
                    style={{ borderRadius: '12px', maxWidth: '100%', height: 'auto' }}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  <img
                    src="https://github-readme-stats-sigma-five.vercel.app/api/top-langs/?username=Aniket-Das-2006&layout=compact&bg_color=0d1117&title_color=818cf8&text_color=c4b5fd&border_color=1e293b&hide_border=false&langs_count=6"
                    alt="Top Languages"
                    style={{ borderRadius: '12px', maxWidth: '100%', height: 'auto' }}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>

            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* PROJECTS TAB                                                 */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'projects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-panel" style={{ padding: '28px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.9rem', fontWeight: '800', marginBottom: '8px' }} className="text-gradient">
                  PROJECT PORTFOLIO
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', maxWidth: '500px', margin: '0 auto' }}>
                  A curated selection of AI pipelines, data engineering tools, and creative developer projects.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="glass-panel"
                    style={{
                      padding: '24px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      borderLeft: `3px solid ${project.color}`,
                      display: 'flex', flexDirection: 'column', gap: '14px'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${project.color}22, 0 0 0 1px ${project.color}33`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.6rem' }}>{project.icon}</span>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff', lineHeight: 1.3 }}>{project.title}</h3>
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ color: 'var(--muted)', transition: 'color 0.2s', marginTop: '2px', flexShrink: 0 }}
                        onMouseEnter={e => e.currentTarget.style.color = project.color}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.65', flex: 1 }}>
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {project.tags.map(tag => (
                        <span key={tag} style={{
                          padding: '3px 10px', borderRadius: '999px', fontSize: '0.68rem', fontWeight: '700',
                          background: `${project.color}15`, border: `1px solid ${project.color}35`,
                          color: project.color, fontFamily: 'var(--font-mono)'
                        }}>{tag}</span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px' }}>
                      <Github size={12} />
                      <Star size={11} fill="rgba(196, 181, 253, 0.4)" stroke="var(--accent-lavender)" style={{ marginTop: '-1px' }} />
                      <span>{project.stars} stars</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* ARCADE TAB                                                   */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'arcade' && (
            <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }} className="text-gradient">NEON RETRO ARCADE</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Enjoy real-time interactive retro games built natively in React.</p>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <button onClick={() => setSelectedGame('brick')} className={`neon-btn ${selectedGame === 'brick' ? 'active' : ''}`}>
                  BREAKOUT
                </button>
                <button onClick={() => setSelectedGame('snake')} className={`neon-btn ${selectedGame === 'snake' ? 'active' : ''}`}>
                  NEON SNAKE
                </button>
              </div>

              {selectedGame === 'brick' ? <BrickBreaker /> : <Snake />}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* LIVE STATIONS TAB                                            */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'live' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }} className="text-gradient">LIVE TELEMETRY STATION</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                  Real-time synchronized world clocks and live atmospheric weather sensors for Berhampore, West Bengal.
                </p>
              </div>
              <WeatherClock />
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* CYBER CANVAS TAB                                             */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {activeTab === 'canvas' && (
            <div className="glass-panel" style={{ padding: '35px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }} className="text-gradient">CYBER CANVAS</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                  Draw freely on an interactive neon canvas. Choose colors, brush sizes, and download your art.
                </p>
              </div>
              <Painter />
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '20px 40px',
        borderTop: '1px solid rgba(129, 140, 248, 0.08)',
        background: 'rgba(7, 10, 19, 0.92)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: '0.7rem', color: 'var(--muted)',
        fontFamily: 'var(--font-mono)'
      }}>
        <span>© 2026 Aniket Das</span>
        <span style={{ color: 'rgba(129,140,248,0.5)' }}>CRAFTED IN BENGAL • NEURAL PROFILE HUB v2.0</span>
        <a href="https://github.com/Aniket-Das-2006" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
          <Github size={16} />
        </a>
      </footer>
    </div>
  );
};

export default App;

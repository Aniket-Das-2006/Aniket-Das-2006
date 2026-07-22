import React, { useState } from 'react';
import { Terminal, Gamepad2, Sun, Heart, Sparkles, BookOpen, User, Github, Linkedin, Calendar } from 'lucide-react';
import BrickBreaker from './components/BrickBreaker';
import Snake from './components/Snake';
import WeatherClock from './components/WeatherClock';
import Painter from './components/Painter';

const App = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedGame, setSelectedGame] = useState('brick');

  const skills = [
    { name: 'Python & Data Science', level: '90%' },
    { name: 'SQL & Database Engineering', level: '85%' },
    { name: 'React & Web Development', level: '80%' },
    { name: 'Tableau & Power BI', level: '88%' },
    { name: 'Machine Learning & AI', level: '75%' }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Background neon grids */}
      <div style={{ position: 'fixed', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', top: '10%', left: '5%', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(196,181,253,0.12) 0%, transparent 70%)', bottom: '15%', right: '5%', pointerEvents: 'none', zIndex: 0 }} />

      {/* Floating Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px',
        background: 'rgba(7, 10, 19, 0.75)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(129, 140, 248, 0.1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '0.5px' }}>
            aniket<span className="text-gradient">das</span>
          </span>
          <span style={{ fontSize: '0.62rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-blue)', letterSpacing: '2px', fontFamily: 'var(--font-mono)' }}>
            Data Science & AI
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setActiveTab('profile')} className={`neon-btn ${activeTab === 'profile' ? 'active' : ''}`}>
            <User size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Profile Hub
          </button>
          <button onClick={() => setActiveTab('arcade')} className={`neon-btn ${activeTab === 'arcade' ? 'active' : ''}`}>
            <Gamepad2 size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Neon Arcade
          </button>
          <button onClick={() => setActiveTab('live')} className={`neon-btn ${activeTab === 'live' ? 'active' : ''}`}>
            <Sun size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Live Stations
          </button>
          <button onClick={() => setActiveTab('canvas')} className={`neon-btn ${activeTab === 'canvas' ? 'active' : ''}`}>
            <Sparkles size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Cyber Canvas
          </button>
        </nav>

        {/* Quick Socials */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-lavender)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--accent-lavender)'}>
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/aniket-das-921b24334/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-lavender)', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--accent-lavender)'}>
            <Linkedin size={20} />
          </a>
        </div>
      </header>

      {/* Main Content Arena */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '40px 20px', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Active Tab rendering */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              {/* Introduction Panel */}
              <div className="glass-panel" style={{ padding: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'var(--font-mono)' }}>Welcome to the Matrix</span>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff', margin: '8px 0 12px' }} className="text-gradient">
                    Aniket Das
                  </h1>
                  <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '1rem', maxWidth: '580px' }}>
                    Undergraduate student at <strong style={{ color: '#fff' }}>IIM Sambalpur</strong> (Batch of 2029) majoring in **Data Science & AI**. Combining advanced database engineering, analytics pipelines, and dynamic client-side visual designs to engineer creative neural applications.
                  </p>
                </div>
                
                {/* Neon Glowing Sticker */}
                <div className="glow-active" style={{
                  width: '90px', height: '90px', borderRadius: '50%',
                  background: 'rgba(129, 140, 248, 0.1)',
                  border: '2px solid var(--accent-indigo)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-lavender)'
                }}>
                  <Sparkles size={36} />
                </div>
              </div>

              {/* Two-Column Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                
                {/* Academic Profile */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <BookOpen size={18} color="var(--accent-blue)" />
                    Academic Timeline
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid var(--border-color)' }}>
                      <span style={{ position: 'absolute', left: '-5px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)', boxShadow: '0 0 8px var(--accent-blue)' }} />
                      <h4 style={{ fontSize: '0.92rem', color: '#fff', fontWeight: '600' }}>IIM Sambalpur</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--accent-lavender)', fontFamily: 'var(--font-mono)' }}>B.S. in Data Science & AI + Management</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>2025 – 2029 (Ongoing)</p>
                    </div>
                    
                    <div style={{ position: 'relative', paddingLeft: '20px', borderLeft: '2px solid var(--border-color)' }}>
                      <span style={{ position: 'absolute', left: '-5px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(129,140,248,0.4)' }} />
                      <h4 style={{ fontSize: '0.92rem', color: '#fff', fontWeight: '600' }}>IIT Madras</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Data Science & Applications</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>Foundation Studies (Completed)</p>
                    </div>
                  </div>
                </div>

                {/* Creative Pillars */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <Heart size={18} color="var(--accent-blue)" />
                    Creative Accomplishments
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px', padding: '10px' }}>
                      <span style={{ fontSize: '1.2rem' }}>🎤</span>
                      <div>
                        <span style={{ fontSize: '0.88rem', color: '#fff', fontWeight: '600' }}>3× State Singing Champion</span>
                        <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>Vocal excellence & performance accolades.</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px', padding: '10px' }}>
                      <span style={{ fontSize: '1.2rem' }}>✍️</span>
                      <div>
                        <span style={{ fontSize: '0.88rem', color: '#fff', fontWeight: '600' }}>4× Bengal Writer Awardee</span>
                        <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>Creative literature & content publications.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Skills Panel */}
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Terminal size={18} color="var(--accent-blue)" />
                  Technical Stacks
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
                  {skills.map((s, idx) => (
                    <div key={idx} style={{ padding: '16px', background: 'rgba(129, 140, 248, 0.04)', border: '1px solid rgba(129, 140, 248, 0.1)', borderRadius: '15px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--accent-lavender)', fontWeight: 'bold' }}>{s.name}</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)' }}>{s.level}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'arcade' && (
            <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }} className="text-gradient">NEON RETRO ARCADE</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Enjoy real-time interactive retro games built natively in React.</p>
              </div>

              {/* Game Selector */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <button onClick={() => setSelectedGame('brick')} className={`neon-btn ${selectedGame === 'brick' ? 'active' : ''}`}>
                  BREAKOUT
                </button>
                <button onClick={() => setSelectedGame('snake')} className={`neon-btn ${selectedGame === 'snake' ? 'active' : ''}`}>
                  NEON SNAKE
                </button>
              </div>

              {/* Render Selected Game */}
              {selectedGame === 'brick' ? <BrickBreaker /> : <Snake />}
            </div>
          )}

          {activeTab === 'live' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }} className="text-gradient">LIVE TELEMETRY STATION</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Real-time synchronized world clocks and live weather sensors for Berhampore.</p>
              </div>
              <WeatherClock />
            </div>
          )}

          {activeTab === 'canvas' && (
            <div className="glass-panel" style={{ padding: '35px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '8px' }} className="text-gradient">CYBER CANVAS</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Futuristic stroke-dashoffset vector art loops.</p>
              </div>
              <Painter />
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '24px 40px',
        borderTop: '1px solid rgba(129, 140, 248, 0.08)',
        background: 'rgba(7, 10, 19, 0.9)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: '0.72rem', color: 'var(--muted)',
        fontFamily: 'var(--font-mono)'
      }}>
        <span>© 2026 Aniket Das</span>
        <span>CRAFTED IN BENGAL • REAL-TIME HUB</span>
      </footer>

    </div>
  );
};

export default App;

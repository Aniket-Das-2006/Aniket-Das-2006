import React from 'react';

const Painter = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '10px' }}>
      <div style={{ position: 'relative', width: '320px', height: '320px', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'rgba(2, 6, 23, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 20px rgba(129, 140, 248, 0.08)' }}>
        
        {/* Decorative corner brackets for a futuristic hud look */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '15px', height: '15px', borderLeft: '2px solid var(--accent-blue)', borderTop: '2px solid var(--accent-blue)' }} />
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '15px', height: '15px', borderRight: '2px solid var(--accent-blue)', borderTop: '2px solid var(--accent-blue)' }} />
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '15px', height: '15px', borderLeft: '2px solid var(--accent-blue)', borderBottom: '2px solid var(--accent-blue)' }} />
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '15px', height: '15px', borderRight: '2px solid var(--accent-blue)', borderBottom: '2px solid var(--accent-blue)' }} />

        {/* Inline SVG drawing loop */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="280" height="280">
          <defs>
            <filter id="neon-glow-p" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur1" />
              <feGaussianBlur stdDeviation="20" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="neon-gradient-p" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3b82f6" />
              <stop offset="50%" stop-color="#818cf8" />
              <stop offset="100%" stop-color="#c4b5fd" />
            </linearGradient>

            <style>{`
              .paint-path-p {
                stroke: url(#neon-gradient-p);
                stroke-width: 4;
                fill: none;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: draw-and-erase-p 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              }

              .sparkle-p {
                fill: #c4b5fd;
                opacity: 0;
                transform-origin: center;
              }

              .sparkle-1-p {
                animation: sparkle-glow-p 8s ease-in-out infinite 1.5s;
              }
              .sparkle-2-p {
                animation: sparkle-glow-p 8s ease-in-out infinite 3.5s;
              }

              @keyframes draw-and-erase-p {
                0% {
                  stroke-dashoffset: 1000;
                  opacity: 0.3;
                }
                5% {
                  opacity: 1;
                }
                40% {
                  stroke-dashoffset: 0;
                  fill: rgba(129, 140, 248, 0.03);
                }
                55% {
                  stroke-dashoffset: 0;
                  fill: rgba(129, 140, 248, 0.12);
                }
                60% {
                  fill: rgba(129, 140, 248, 0.03);
                }
                90% {
                  stroke-dashoffset: -1000;
                  opacity: 1;
                }
                95%, 100% {
                  stroke-dashoffset: -1000;
                  opacity: 0;
                }
              }

              @keyframes sparkle-glow-p {
                0%, 100%, 70% {
                  opacity: 0;
                  transform: scale(0.2) rotate(0deg);
                }
                45% {
                  opacity: 1;
                  transform: scale(1.2) rotate(180deg);
                }
                55% {
                  opacity: 1;
                  transform: scale(1) rotate(240deg);
                }
              }
            `}</style>
          </defs>

          <circle cx="200" cy="200" r="160" stroke="#1e293b" stroke-width="1.5" fill="none" opacity="0.3" stroke-dasharray="8 6"/>

          <g transform="translate(70, 70) scale(10.8)" filter="url(#neon-glow-p)">
            <path class="paint-path-p" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </g>

          <g transform="translate(310, 110)" class="sparkle-p sparkle-1-p">
            <path d="M0 -15 L3 -5 L13 -2 L3 1 L0 11 L-3 1 L-13 -2 L-3 -5 Z" filter="url(#neon-glow-p)"/>
          </g>
          <g transform="translate(80, 290)" class="sparkle-p sparkle-2-p">
            <path d="M0 -10 L2 -3 L9 -1 L2 1 L0 8 L-2 1 L-9 -1 L-2 -3 Z" filter="url(#neon-glow-p)"/>
          </g>
        </svg>

      </div>
      <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
        OCTOCAT PAINTER LOOP
      </span>
    </div>
  );
};

export default Painter;

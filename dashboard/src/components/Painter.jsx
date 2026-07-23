import React, { useRef, useEffect, useState, useCallback } from 'react';

const COLORS = [
  '#3b82f6', '#818cf8', '#c4b5fd', '#06b6d4', '#10b981',
  '#f59e0b', '#ec4899', '#ef4444', '#ffffff', '#64748b',
];

const BRUSH_SIZES = [
  { label: 'XS', size: 2 },
  { label: 'S', size: 5 },
  { label: 'M', size: 10 },
  { label: 'L', size: 20 },
  { label: 'XL', size: 35 },
];

const TOOLS = [
  { id: 'pen', label: '✏️ Pen' },
  { id: 'glow', label: '✨ Glow' },
  { id: 'eraser', label: '⬜ Eraser' },
];

const Painter = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#c4b5fd');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState('pen');
  const [lastPos, setLastPos] = useState(null);
  const [strokeCount, setStrokeCount] = useState(0);

  // Initialize canvas with dark background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw subtle grid
    ctx.strokeStyle = 'rgba(129,140,248,0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = useCallback((e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const pos = getPos(e, canvas);
    setIsDrawing(true);
    setLastPos(pos);
    // Draw a dot on click
    const ctx = canvas.getContext('2d');
    drawPoint(ctx, pos.x, pos.y);
  }, [color, brushSize, tool]);

  const drawPoint = (ctx, x, y) => {
    ctx.save();
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fill();
    } else if (tool === 'glow') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = brushSize * 3;
      ctx.shadowColor = color;
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
    ctx.restore();
  };

  const draw = useCallback((e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);

    ctx.save();
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.shadowBlur = 0;
    } else if (tool === 'glow') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.shadowBlur = brushSize * 2.5;
      ctx.shadowColor = color;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.shadowBlur = 0;
    }

    if (lastPos) {
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    ctx.restore();
    setLastPos(pos);
  }, [isDrawing, color, brushSize, tool, lastPos]);

  const stopDraw = useCallback((e) => {
    if (isDrawing) {
      setStrokeCount(prev => prev + 1);
    }
    setIsDrawing(false);
    setLastPos(null);
  }, [isDrawing]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Redraw grid
    ctx.strokeStyle = 'rgba(129,140,248,0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
    ctx.restore();
    setStrokeCount(0);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `aniket-canvas-art-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%', maxWidth: '560px' }}>

      {/* Tool Bar */}
      <div style={{
        width: '100%', display: 'flex', flexWrap: 'wrap', gap: '10px',
        justifyContent: 'center', alignItems: 'center',
        background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(129,140,248,0.12)',
        borderRadius: '14px', padding: '12px 16px'
      }}>
        {/* Tools */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {TOOLS.map(t => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`neon-btn ${tool === t.id ? 'active' : ''}`}
              style={{ padding: '6px 12px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.08)' }} />

        {/* Brush Sizes */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {BRUSH_SIZES.map(b => (
            <button
              key={b.label}
              onClick={() => setBrushSize(b.size)}
              title={`Brush: ${b.label} (${b.size}px)`}
              style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: brushSize === b.size ? 'rgba(129,140,248,0.25)' : 'rgba(255,255,255,0.03)',
                border: brushSize === b.size ? '2px solid var(--accent-indigo)' : '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              <div style={{
                width: `${Math.min(b.size * 0.6 + 4, 20)}px`,
                height: `${Math.min(b.size * 0.6 + 4, 20)}px`,
                borderRadius: '50%',
                background: brushSize === b.size ? 'var(--accent-indigo)' : '#475569'
              }} />
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div style={{
        width: '100%', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap',
        background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(129,140,248,0.12)',
        borderRadius: '14px', padding: '12px 16px'
      }}>
        {COLORS.map(c => (
          <button
            key={c}
            onClick={() => setColor(c)}
            title={c}
            style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: c,
              border: color === c ? '3px solid #fff' : '2px solid transparent',
              cursor: 'pointer',
              boxShadow: color === c ? `0 0 10px ${c}` : 'none',
              transition: 'all 0.2s',
              transform: color === c ? 'scale(1.2)' : 'scale(1)'
            }}
          />
        ))}
        {/* Custom color input */}
        <div style={{ position: 'relative', width: '28px', height: '28px' }} title="Custom Color">
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'conic-gradient(red, yellow, lime, cyan, blue, magenta, red)',
            border: '2px solid rgba(255,255,255,0.3)',
            cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px'
          }}>🎨</div>
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            style={{
              position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%', borderRadius: '50%'
            }}
          />
        </div>
      </div>

      {/* Canvas Area */}
      <div style={{
        position: 'relative', width: '100%',
        borderRadius: '16px', overflow: 'hidden',
        border: `2px solid ${tool === 'eraser' ? 'rgba(239,68,68,0.4)' : color + '60'}`,
        boxShadow: `0 0 20px ${tool === 'eraser' ? 'rgba(239,68,68,0.15)' : color + '20'}`,
        transition: 'border-color 0.3s, box-shadow 0.3s'
      }}>
        {/* HUD corners */}
        <div style={{ position: 'absolute', top: 8, left: 8, width: 16, height: 16, borderLeft: '2px solid var(--accent-blue)', borderTop: '2px solid var(--accent-blue)', pointerEvents: 'none', zIndex: 2 }} />
        <div style={{ position: 'absolute', top: 8, right: 8, width: 16, height: 16, borderRight: '2px solid var(--accent-blue)', borderTop: '2px solid var(--accent-blue)', pointerEvents: 'none', zIndex: 2 }} />
        <div style={{ position: 'absolute', bottom: 8, left: 8, width: 16, height: 16, borderLeft: '2px solid var(--accent-blue)', borderBottom: '2px solid var(--accent-blue)', pointerEvents: 'none', zIndex: 2 }} />
        <div style={{ position: 'absolute', bottom: 8, right: 8, width: 16, height: 16, borderRight: '2px solid var(--accent-blue)', borderBottom: '2px solid var(--accent-blue)', pointerEvents: 'none', zIndex: 2 }} />

        <canvas
          ref={canvasRef}
          width={520}
          height={380}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
          style={{
            display: 'block',
            width: '100%',
            cursor: tool === 'eraser' ? 'cell' : 'crosshair',
            touchAction: 'none'
          }}
        />

        {/* Live color indicator dot */}
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '6px', alignItems: 'center',
          background: 'rgba(2,6,23,0.7)', borderRadius: '999px', padding: '3px 10px',
          fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)',
          pointerEvents: 'none', zIndex: 2
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: tool === 'eraser' ? '#ef4444' : color, boxShadow: `0 0 6px ${color}` }} />
          {tool.toUpperCase()} • {brushSize}px • {strokeCount} strokes
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={clearCanvas}
          className="neon-btn"
          style={{ padding: '8px 20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          🗑️ Clear Canvas
        </button>
        <button
          onClick={downloadCanvas}
          className="neon-btn active"
          style={{ padding: '8px 20px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          💾 Export PNG
        </button>
      </div>

      <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
        CYBER CANVAS v2 • INTERACTIVE NEON ART STUDIO
      </span>
    </div>
  );
};

export default Painter;

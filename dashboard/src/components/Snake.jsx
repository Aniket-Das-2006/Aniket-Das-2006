import React, { useRef, useEffect, useState } from 'react';

const Snake = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const gridSize = 20;
  const tileCount = 20; // 400x400 canvas (20x20 tiles)

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    let food = { x: 15, y: 15 };
    let dx = 1;
    let dy = 0;
    let nextDx = 1;
    let nextDy = 0;

    const keyDownHandler = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (dy !== 1) { nextDx = 0; nextDy = -1; }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (dy !== -1) { nextDx = 0; nextDy = 1; }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (dx !== 1) { nextDx = -1; nextDy = 0; }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (dx !== -1) { nextDx = 1; nextDy = 0; }
          break;
      }
    };

    window.addEventListener('keydown', keyDownHandler);

    const generateFood = () => {
      let newFood;
      while (true) {
        newFood = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount)
        };
        // Check if food is on snake
        let onSnake = false;
        for (let segment of snake) {
          if (segment.x === newFood.x && segment.y === newFood.y) {
            onSnake = true;
            break;
          }
        }
        if (!onSnake) break;
      }
      food = newFood;
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
      }
    };

    const drawSnake = () => {
      snake.forEach((segment, idx) => {
        ctx.beginPath();
        ctx.rect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
        
        // Head vs body colors
        if (idx === 0) {
          ctx.fillStyle = '#3b82f6'; // Bright blue head
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#3b82f6';
        } else {
          // Gradient down the body
          ctx.fillStyle = `rgba(129, 140, 248, ${1 - idx / (snake.length + 5)})`;
        }
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
      });
    };

    const drawFood = () => {
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#c4b5fd'; // Lavender food
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#c4b5fd';
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;
    };

    const update = () => {
      dx = nextDx;
      dy = nextDy;

      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Wall collision
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        setGameState('GAMEOVER');
        return;
      }

      // Self collision
      for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
          setGameState('GAMEOVER');
          return;
        }
      }

      snake.unshift(head);

      // Food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        generateFood();
      } else {
        snake.pop();
      }
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      drawFood();
      drawSnake();
      update();
    };

    // Run game step every 100ms
    const intervalId = setInterval(gameLoop, 100);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setGameState('PLAYING');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '400px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
        <span>SCORE: <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>{score}</span></span>
        <span>HIGH SCORE: <span style={{ color: 'var(--accent-lavender)', fontWeight: 'bold' }}>{highScore}</span></span>
      </div>

      <div style={{ position: 'relative', width: '400px', height: '400px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--border-color)', background: 'rgba(2, 6, 23, 0.8)' }}>
        <canvas ref={canvasRef} width="400" height="400" style={{ display: 'block' }} />
        
        {gameState !== 'PLAYING' && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(7, 10, 19, 0.85)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px',
            backdropFilter: 'blur(4px)'
          }}>
            {gameState === 'START' && (
              <>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800' }} className="text-gradient">NEON SNAKE</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center', maxWidth: '300px', lineHeight: '1.6' }}>
                  Use WASD or Arrow Keys to navigate the glowing snake. Eat lavender pellets to grow!
                </p>
                <button onClick={startGame} className="neon-btn active">START ENGINE</button>
              </>
            )}

            {gameState === 'GAMEOVER' && (
              <>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ef4444' }}>ENGINE CRASHED</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>You scored {score} points</p>
                <button onClick={startGame} className="neon-btn active">REBOOT GAME</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Snake;

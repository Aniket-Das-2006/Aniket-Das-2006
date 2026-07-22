import React, { useRef, useEffect, useState } from 'react';

const BrickBreaker = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER, WIN
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  
  // Game parameters
  const paddleWidth = 75;
  const paddleHeight = 10;
  const ballRadius = 6;
  const brickRowCount = 4;
  const brickColumnCount = 6;
  const brickWidth = 65;
  const brickHeight = 15;
  const brickPadding = 8;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 20;

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 2.5;
    let dy = -2.5;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;

    // Initialize bricks
    const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    const keyDownHandler = (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = true;
      else if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = true;
    };

    const keyUpHandler = (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = false;
      else if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = false;
    };

    const mouseMoveHandler = (e) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    };

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    canvas.addEventListener('mousemove', mouseMoveHandler, false);

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#c4b5fd'; // Lavender ball
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#c4b5fd';
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0; // Reset shadow
    };

    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight - 5, paddleWidth, paddleHeight);
      ctx.fillStyle = '#3b82f6'; // Blue paddle
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#3b82f6';
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;
    };

    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            
            // Neon gradient for bricks (blue to lavender)
            const grad = ctx.createLinearGradient(brickX, brickY, brickX + brickWidth, brickY);
            if (r % 2 === 0) {
              grad.addColorStop(0, '#3b82f6');
              grad.addColorStop(1, '#818cf8');
              ctx.shadowColor = '#3b82f6';
            } else {
              grad.addColorStop(0, '#818cf8');
              grad.addColorStop(1, '#c4b5fd');
              ctx.shadowColor = '#c4b5fd';
            }
            
            ctx.fillStyle = grad;
            ctx.shadowBlur = 4;
            ctx.fill();
            ctx.closePath();
            ctx.shadowBlur = 0;
          }
        }
      }
    };

    const collisionDetection = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
              dy = -dy;
              b.status = 0;
              setScore((prev) => {
                const newScore = prev + 10;
                if (newScore > highScore) setHighScore(newScore);
                
                // Win Condition
                if (newScore === brickRowCount * brickColumnCount * 10) {
                  setGameState('WIN');
                }
                return newScore;
              });
            }
          }
        }
      }
    };

    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      collisionDetection();

      // Ball wall bounces
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius - 5) {
        // Paddle bounce
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
          // Add angle deviation based on where ball hits paddle
          const hitPos = (x - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
          dx = hitPos * 3;
        } else {
          // Lose life
          setLives((prevLives) => {
            if (prevLives - 1 === 0) {
              setGameState('GAMEOVER');
              return 0;
            } else {
              // Reset ball position
              x = canvas.width / 2;
              y = canvas.height - 30;
              dx = 2.5;
              dy = -2.5;
              paddleX = (canvas.width - paddleWidth) / 2;
              return prevLives - 1;
            }
          });
        }
      }

      // Move paddle
      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
      }

      x += dx;
      y += dy;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      canvas.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameState('PLAYING');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '460px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
        <span>SCORE: <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>{score}</span></span>
        <span>LIVES: <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{'❤️'.repeat(lives)}</span></span>
        <span>HIGH: <span style={{ color: 'var(--accent-lavender)' }}>{highScore}</span></span>
      </div>

      <div style={{ position: 'relative', width: '460px', height: '320px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--border-color)', background: 'rgba(2, 6, 23, 0.8)' }}>
        <canvas ref={canvasRef} width="460" height="320" style={{ display: 'block', cursor: 'none' }} />
        
        {gameState !== 'PLAYING' && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(7, 10, 19, 0.85)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px',
            backdropFilter: 'blur(4px)'
          }}>
            {gameState === 'START' && (
              <>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800' }} className="text-gradient">NEON BREAKOUT</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center', maxWidth: '300px', lineHeight: '1.6' }}>
                  Use left/right arrows or move your mouse to guide the glowing paddle. Clear all bricks to win!
                </p>
                <button onClick={startGame} className="neon-btn active">PLAY NOW</button>
              </>
            )}

            {gameState === 'GAMEOVER' && (
              <>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ef4444' }}>GAME OVER</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>You scored {score} points</p>
                <button onClick={startGame} className="neon-btn active">TRY AGAIN</button>
              </>
            )}

            {gameState === 'WIN' && (
              <>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981' }}>YOU CLEARED IT!</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>High score: {score}!</p>
                <button onClick={startGame} className="neon-btn active">PLAY AGAIN</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrickBreaker;

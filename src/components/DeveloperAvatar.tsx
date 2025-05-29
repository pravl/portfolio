import { useEffect, useRef } from 'react';

const DeveloperAvatar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;

    // Animation variables
    let frame = 0;
    const symbols = '< /> {} [] = + - * # && || => async function const let var import export interface type class';
    const symbolsArray = symbols.split(' ');
    const particles: { x: number; y: number; symbol: string; speed: number; opacity: number; size: number }[] = [];

    // Create initial particles with varying sizes
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        symbol: symbolsArray[Math.floor(Math.random() * symbolsArray.length)],
        speed: 0.3 + Math.random() * 1.5,
        opacity: 0.1 + Math.random() * 0.5,
        size: 8 + Math.random() * 16 // Varying text sizes
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position with a slight wave motion
        particle.y -= particle.speed;
        particle.x += Math.sin(frame / 50 + particle.y / 30) * 0.5;

        // Reset particle when it goes off screen
        if (particle.y < -20) {
          particle.y = canvas.height + 20;
          particle.x = Math.random() * canvas.width;
          particle.symbol = symbolsArray[Math.floor(Math.random() * symbolsArray.length)];
        }

        // Draw particle with pulsing opacity
        const pulsingOpacity = particle.opacity * (0.7 + 0.3 * Math.sin(frame / 30 + particle.y / 20));
        ctx.fillStyle = `rgba(var(--primary-rgb), ${pulsingOpacity})`;
        ctx.font = `${particle.size}px monospace`;
        ctx.fillText(particle.symbol, particle.x, particle.y);
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="developer-avatar">
      <canvas 
        ref={canvasRef}
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          background: 'var(--card-bg)',
          boxShadow: 'var(--card-shadow)'
        }}
      />
    </div>
  );
};

export default DeveloperAvatar; 
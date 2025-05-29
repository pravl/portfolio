import { useEffect, useRef } from 'react';
import { FaTerminal } from 'react-icons/fa';

const DeveloperAvatar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get computed colors from CSS variables
    const computedStyle = getComputedStyle(document.documentElement);
    const primaryColor = computedStyle.getPropertyValue('--primary').trim();
    const primaryDarkColor = computedStyle.getPropertyValue('--primary-dark').trim();
    const textPrimaryColor = computedStyle.getPropertyValue('--text-primary').trim();
    const textSecondaryColor = computedStyle.getPropertyValue('--text-secondary').trim();
    const backgroundColor = computedStyle.getPropertyValue('--background').trim();
    const cardBgColor = computedStyle.getPropertyValue('--card-bg').trim();
    const primaryRgb = computedStyle.getPropertyValue('--primary-rgb').trim();

    // Define vibrant colors for characters
    const characterColors = [
      '#3b82f6', // blue
      '#ef4444', // red
      '#f59e0b', // amber
      '#10b981', // emerald
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#06b6d4', // cyan
      '#f97316', // orange
    ];

    // Set canvas size with 16:9 aspect ratio but smaller for mobile
    const updateCanvasSize = () => {
      const containerWidth = container.clientWidth;
      const aspectRatio = 16 / 9;
      const maxWidth = Math.min(800, containerWidth - 40);
      canvas.width = maxWidth;
      canvas.height = maxWidth / aspectRatio;
    };

    // Initial size setup
    updateCanvasSize();

    // Add resize listener
    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    // Animation variables
    let frame = 0;
    const symbols = '< > / { } [ ] = + - * # & | ! : ; ( ) . " \' $ @ _ \\ % ^ ~';
    const symbolsArray = symbols.split(' ');
    
    interface Particle {
      x: number;
      y: number;
      symbol: string;
      speed: number;
      opacity: number;
      size: number;
      color: string;
      rotationSpeed: number;
      rotation: number;
      velocityX: number;
      velocityY: number;
      floatOffset: number;
      floatSpeed: number;
      amplitude: number;
    }

    const particles: Particle[] = [];

    // Create initial particles with varying properties
    for (let i = 0; i < 80; i++) {
      const symbol = symbolsArray[Math.floor(Math.random() * symbolsArray.length)];
      const color = characterColors[Math.floor(Math.random() * characterColors.length)];

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        symbol,
        speed: 0.2 + Math.random() * 1.2,
        opacity: 0.4 + Math.random() * 0.6,
        size: 16 + Math.random() * 16, // Decreased size range (16-32px)
        color,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        rotation: Math.random() * Math.PI * 2,
        velocityX: (Math.random() - 0.5) * 1.5,
        velocityY: (Math.random() - 0.5) * 1.5,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.02 + Math.random() * 0.03,
        amplitude: 0.8 + Math.random() * 1.2
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fill with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Add floating motion
        const floatY = Math.sin(frame * particle.floatSpeed + particle.floatOffset) * particle.amplitude;
        const floatX = Math.cos(frame * particle.floatSpeed * 0.7 + particle.floatOffset) * (particle.amplitude * 0.5);
        
        // Update position with improved movement
        particle.x += particle.velocityX + floatX * 0.3;
        particle.y += particle.velocityY + floatY * 0.3;
        particle.rotation += particle.rotationSpeed + Math.sin(frame * 0.02) * 0.01;

        // Bounce off edges with damping and wrap-around effect
        if (particle.x < -50) {
          particle.x = canvas.width + 50;
        } else if (particle.x > canvas.width + 50) {
          particle.x = -50;
        }

        if (particle.y < -50) {
          particle.y = canvas.height + 50;
        } else if (particle.y > canvas.height + 50) {
          particle.y = -50;
        }

        // Add gentle swaying motion
        particle.velocityX += Math.sin(frame * 0.01) * 0.01;
        particle.velocityY += Math.cos(frame * 0.01) * 0.01;

        // Add random movement with reduced intensity
        particle.velocityX += (Math.random() - 0.5) * 0.05;
        particle.velocityY += (Math.random() - 0.5) * 0.05;

        // Limit velocity with smoother damping
        const maxVelocity = 1.5;
        const velocity = Math.sqrt(particle.velocityX * particle.velocityX + particle.velocityY * particle.velocityY);
        if (velocity > maxVelocity) {
          const dampingFactor = 0.95;
          particle.velocityX *= dampingFactor;
          particle.velocityY *= dampingFactor;
        }

        // Draw particle with enhanced pulsing opacity
        const pulsingOpacity = particle.opacity * (0.7 + 0.3 * Math.sin(frame * 0.02 + particle.floatOffset));
        
        // Add enhanced glow effect
        ctx.save();
        ctx.filter = 'blur(6px)'; // Slightly reduced blur for smaller characters
        ctx.fillStyle = `${particle.color}${Math.floor(pulsingOpacity * 127).toString(16).padStart(2, '0')}`;
        ctx.font = `900 ${particle.size}px monospace`;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillText(particle.symbol, 0, 0);
        ctx.restore();

        // Draw the main character with slight scale pulsing
        ctx.save();
        const scale = 1 + Math.sin(frame * 0.03 + particle.floatOffset) * 0.1;
        ctx.fillStyle = `${particle.color}${Math.floor(pulsingOpacity * 255).toString(16).padStart(2, '0')}`;
        ctx.font = `900 ${particle.size}px monospace`;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.scale(scale, scale);

        // Add stroke for extra boldness (adjusted for smaller size)
        ctx.strokeStyle = `${particle.color}${Math.floor(pulsingOpacity * 127).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = particle.size / 20; // Reduced stroke width ratio for smaller characters
        ctx.strokeText(particle.symbol, 0, 0);
        ctx.fillText(particle.symbol, 0, 0);
        ctx.restore();
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="developer-avatar" ref={containerRef}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button close" />
          <div className="terminal-button minimize" />
          <div className="terminal-button maximize" />
        </div>
        <div className="terminal-title">
          <FaTerminal style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          ~/developer-canvas
        </div>
      </div>
      <div className="terminal-content">
        <div className="canvas-container">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default DeveloperAvatar; 
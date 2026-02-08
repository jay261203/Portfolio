import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface Edge {
  from: number;
  to: number;
  opacity: number;
}

const FloatingShapes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const { scrollY } = useScroll();
  const parallaxY1 = useTransform(scrollY, [0, 1000], [0, -50]);
  const parallaxY2 = useTransform(scrollY, [0, 1000], [0, -30]);

  // Initialize nodes
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const nodeCount = Math.min(Math.floor((dimensions.width * dimensions.height) / 40000), 25);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      nodes.push({
        id: i,
        x,
        y,
        targetX: x,
        targetY: y,
        vx: 0,
        vy: 0,
        radius: 2 + Math.random() * 2,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    nodesRef.current = nodes;

    // Create edges based on proximity
    const updateEdges = () => {
      const edges: Edge[] = [];
      const maxDistance = 200;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            edges.push({
              from: i,
              to: j,
              opacity: 1 - distance / maxDistance,
            });
          }
        }
      }
      edgesRef.current = edges;
    };
    updateEdges();

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let time = 0;
    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update node positions with smooth drift
      nodesRef.current.forEach((node) => {
        // Slowly move towards new random targets
        if (Math.random() < 0.002) {
          node.targetX = node.x + (Math.random() - 0.5) * 100;
          node.targetY = node.y + (Math.random() - 0.5) * 100;
          node.targetX = Math.max(50, Math.min(dimensions.width - 50, node.targetX));
          node.targetY = Math.max(50, Math.min(dimensions.height - 50, node.targetY));
        }

        // Smooth interpolation
        node.vx += (node.targetX - node.x) * 0.0003;
        node.vy += (node.targetY - node.y) * 0.0003;
        node.vx *= 0.99;
        node.vy *= 0.99;
        node.x += node.vx;
        node.y += node.vy;

        // Update pulse
        node.pulsePhase += 0.02;
      });

      // Update edges
      updateEdges();

      // Draw edges with gradient
      edgesRef.current.forEach((edge) => {
        const from = nodesRef.current[edge.from];
        const to = nodesRef.current[edge.to];
        
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        const baseOpacity = edge.opacity * 0.15;
        gradient.addColorStop(0, `rgba(139, 92, 246, ${baseOpacity})`);
        gradient.addColorStop(0.5, `rgba(99, 102, 241, ${baseOpacity * 0.8})`);
        gradient.addColorStop(1, `rgba(139, 92, 246, ${baseOpacity})`);
        
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Animated data pulse along edge
        const pulsePos = (time * 0.5 + edge.from * 0.1) % 1;
        const pulseX = from.x + (to.x - from.x) * pulsePos;
        const pulseY = from.y + (to.y - from.y) * pulsePos;
        
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${edge.opacity * 0.3})`;
        ctx.fill();
      });

      // Draw nodes with glow
      nodesRef.current.forEach((node) => {
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
        const glowRadius = node.radius * 3 * pulse;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        gradient.addColorStop(0, `rgba(139, 92, 246, ${0.4 * pulse})`);
        gradient.addColorStop(0.5, `rgba(99, 102, 241, ${0.1 * pulse})`);
        gradient.addColorStop(1, "rgba(139, 92, 246, 0)");
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${0.6 * pulse})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dark gradient mesh background with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: parallaxY1 }}
      >
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 50% 60% at 50% 50%, rgba(79, 70, 229, 0.08) 0%, transparent 60%)
            `,
          }}
        />
      </motion.div>
      
      <motion.div
        className="absolute inset-0"
        style={{ y: parallaxY2 }}
      >
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 40% 30% at 70% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 30% 70%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)
            `,
          }}
        />
      </motion.div>

      {/* Subtle mesh grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Neural network canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Top fade for text readability */}
      <div 
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default FloatingShapes;

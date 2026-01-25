import React, { useEffect, useRef } from "react";
import "../styles.css";

/**
 * Particles
 * ----------
 * Soft cinematic light particles floating across the screen
 * - Adds dreamy film-like atmosphere
 * - Stays behind the image
 * - Mobile optimized
 */
export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      const count = window.innerWidth < 768 ? 20 : 40; // fewer on mobile
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 0.2 + 0.05,
        speedX: Math.random() * 0.1 - 0.05,
        opacity: Math.random() * 0.4 + 0.2,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity -= 0.0003;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 240, ${p.opacity})`;
        ctx.shadowColor = "rgba(255,200,230,0.4)";
        ctx.shadowBlur = 6;
        ctx.fill();

        // Reset particle when it fades or leaves screen
        if (p.y < -20 || p.opacity <= 0) {
          p.y = height + Math.random() * 50;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.4 + 0.2;
        }
      });

      requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
}

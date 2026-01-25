import React, { useEffect, useRef } from "react";
import "../styles.css";

/**
 * StarsBackground
 * ----------------
 * Cinematic animated star field using canvas.
 * - Soft twinkling
 * - Lightweight for mobile
 * - Scales perfectly to any screen
 */
export default function StarsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;
    let stars = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createStars();
    };

    const createStars = () => {
      const count = window.innerWidth < 768 ? 80 : 160; // fewer stars on phone
      stars = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.2 + 0.05,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#ffffff";

      stars.forEach((star) => {
        star.alpha += star.speed * 0.02;
        if (star.alpha > 1) star.alpha = 0.2;

        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="stars-canvas" />;
}

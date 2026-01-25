import React, { useEffect, useRef } from "react";
import "../styles.css";

/**
 * HeartsOverlay
 * --------------
 * Floating cinematic hearts across the entire screen
 * - Same heart style as before (not emoji)
 * - Appears everywhere, not just bottom
 * - Stays BEHIND the image (never covers faces)
 * - Mobile optimized
 */
export default function HeartsOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;
    let hearts = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createHearts();
    };

    const createHearts = () => {
      const count = window.innerWidth < 768 ? 10 : 18; // fewer hearts on phone
      hearts = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height, // start anywhere on screen
        size:
          window.innerWidth < 768
            ? Math.random() * 6 + 12 // mobile
            : Math.random() * 10 + 16, // desktop
        speed: Math.random() * 0.3 + 0.15,
        opacity: Math.random() * 0.4 + 0.3,
        sway: Math.random() * 0.8 + 0.4,
      }));
    };

    const drawHeart = (x, y, size, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 20, size / 20);
      ctx.globalAlpha = opacity;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10, -10, -20, 10, 0, 20);
      ctx.bezierCurveTo(20, 10, 10, -10, 0, 0);
      ctx.closePath();

      ctx.fillStyle = "#ff4d6d";
      ctx.shadowColor = "rgba(255, 120, 160, 0.5)";
      ctx.shadowBlur = 8;
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      hearts.forEach((heart) => {
        heart.y -= heart.speed; // float upward
        heart.x += Math.sin(heart.y * 0.01) * heart.sway; // gentle side motion
        heart.opacity -= 0.0006;

        drawHeart(heart.x, heart.y, heart.size, heart.opacity);

        // Reset heart when it fades or leaves screen
        if (heart.y < -50 || heart.opacity <= 0) {
          heart.y = height + Math.random() * 100;
          heart.x = Math.random() * width;
          heart.opacity = Math.random() * 0.4 + 0.3;
        }
      });

      requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="hearts-canvas" />;
}

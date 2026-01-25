import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ImageScene from "./components/ImageScene";
import HeartsOverlay from "./components/HeartsOverlay";
import Particles from "./components/Particles";
import GlowLayer from "./components/GlowLayer";
import StarsBackground from "./components/StarsBackground";
import "./ImageScene.css";
import "./styles.css";

import img1 from "./assets/images/img1.png";
import img2 from "./assets/images/img2.png";
import img3 from "./assets/images/img3.png";
import img4 from "./assets/images/img4.png";
import img5 from "./assets/images/img5.png";
import img6 from "./assets/images/img6.png";
import img7 from "./assets/images/img7.png";
import img8 from "./assets/images/img8.png";
import img9 from "./assets/images/img9.png";
import img10 from "./assets/images/img10.png";
import img11 from "./assets/images/img11.png";

export default function FinalStory() {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  // ---- STORY DATA (Memoized to prevent re-creation every render) ----
  const scenes = useMemo(
    () => [
      {
        id: 1,
        image: img1,
        text: "Happy Birthday, My Love",
        animation: "fade",
        duration: 5000,
      },
      {
        id: 2,
        image: img2,
        text: "It started with a feeling…",
        animation: "zoom",
        duration: 5000,
      },
      {
        id: 3,
        image: img3,
        text: "Then we chose to move forward",
        animation: "slide-left",
        duration: 5000,
      },
      {
        id: 4,
        image: img4,
        text: "Together",
        animation: "slide-right",
        duration: 5000,
      },
      {
        id: 5,
        image: img5,
        text: "Through every road we take",
        animation: "blur-in",
        duration: 5000,
      },
      {
        id: 6,
        image: img6,
        text: "I see a place for us",
        animation: "fade-up",
        duration: 5000,
      },
      {
        id: 7,
        image: img7,
        text: "A world built on love",
        animation: "cinematic-pan",
        duration: 5000,
      },
      {
        id: 8,
        image: img8,
        text: "Not just in dreams…",
        animation: "soft-zoom",
        duration: 5000,
      },
      {
        id: 9,
        image: img9,
        text: "But in my heart",
        animation: "fade",
        duration: 5000,
      },
      {
        id: 10,
        image: img10,
        text: "This is where we both belong",
        animation: "glow",
        duration: 5000,
      },
      {
        id: 11,
        image: img11,
        text: "This is where I see us.",
        animation: "finale",
        duration: 5000,
      },
    ],
    [],
  );

  // ---- PRELOAD IMAGES ----
  useEffect(() => {
    let loadedCount = 0;

    scenes.forEach((scene) => {
      const img = new Image();
      img.src = scene.image;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === scenes.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, [scenes]);

  // ---- AUTO PLAY TIMELINE ----
  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < scenes.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, scenes[currentIndex].duration);

      return () => clearTimeout(timer);
    } else {
      if (!audioRef.current) return;

      audioRef.current.volume = 0.6;
      const fade = setInterval(() => {
        if (!audioRef.current) {
          clearInterval(fade);
          return;
        }

        if (audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.02;
        } else {
          audioRef.current.pause();
          clearInterval(fade);
        }
      }, 200);
    }
  }, [currentIndex, hasStarted, scenes]);

  // ---- START MUSIC ----
  const startStory = () => {
    if (!imagesLoaded) return;

    if (!hasStarted) {
      setHasStarted(true);
      if (!audioRef.current) return;

      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="finalstory-container" onClick={startStory}>
      <button
        className="back-arrow"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate(-1);
        }}
      >
        ←
      </button>

      <StarsBackground />
      <Particles />
      <GlowLayer />

      <ImageScene
        key={currentIndex}
        image={scenes[currentIndex].image}
        text={scenes[currentIndex].text}
        animation={scenes[currentIndex].animation}
      />

      {currentIndex >= 1 && <HeartsOverlay />}

      <audio ref={audioRef} src="/assets/music/instrumental.mp3" />

      {!hasStarted && (
        <div className="tap-to-start">
          <div className="tap-to-start-content">
            {!imagesLoaded
              ? "Loading our story…"
              : "Tap anywhere… and turn your phone to enter our story."}
          </div>
        </div>
      )}
    </div>
  );
}

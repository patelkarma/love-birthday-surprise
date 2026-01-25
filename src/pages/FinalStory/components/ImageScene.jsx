import React, { useEffect, useRef, useState } from "react";
import "../styles.css";

export default function ImageScene({ image, text, animation }) {
  const isMobile = window.innerWidth <= 768;

  const [currentImage, setCurrentImage] = useState(image);
  const [fadeState, setFadeState] = useState("show");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isMobile) {
      // Laptop: behave exactly as before
      setCurrentImage(image);
      setFadeState("show");
      return;
    }

    // 📱 MOBILE: avoid initial blank / background loss
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setCurrentImage(image);
      setFadeState("show");
      return;
    }

    // Fade out old image
    setFadeState("hide");

    const swap = setTimeout(() => {
      setCurrentImage(image);
      setFadeState("show");
    }, 200);

    return () => clearTimeout(swap);
  }, [image, isMobile]);

  return (
    <div className={`image-scene ${animation}`}>
      <div className={`image-wrapper ${fadeState}`}>
        <img
          src={currentImage}
          alt="story scene"
          className="scene-image"
          draggable={false}
        />
      </div>

      <div className="scene-overlay">
        <p className="scene-text">{text}</p>
      </div>
    </div>
  );
}

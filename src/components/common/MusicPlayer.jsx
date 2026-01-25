import { useEffect, useRef } from "react";
import { useMusic } from "../../hooks/MusicContext";

export default function MusicPlayer({ src, volume = 0.35 }) {
  const audioRef = useRef(null);
  const { isPlaying } = useMusic();

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, volume]);

  return <audio ref={audioRef} src={src} loop preload="auto" />;
}

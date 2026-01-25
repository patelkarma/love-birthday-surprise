import { useState } from "react";

export default function useMusic() {
    const [isPlaying, setIsPlaying] = useState(false);

    const startMusic = () => setIsPlaying(true);
    const stopMusic = () => setIsPlaying(false);

    return { isPlaying, startMusic, stopMusic };
}

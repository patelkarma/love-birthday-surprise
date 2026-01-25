import { createContext, useContext, useState } from "react";

const MusicContext = createContext();

export function MusicProvider({ children }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const startMusic = () => setIsPlaying(true);
    const stopMusic = () => setIsPlaying(false);

    return (
        <MusicContext.Provider value={{ isPlaying, startMusic, stopMusic }}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    return useContext(MusicContext);
}

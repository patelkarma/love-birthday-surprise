import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Reasons from "./pages/Reasons/Reasons";
import PageWrapper from "./components/common/PageWrapper";
import Landing from "./pages/Landing/Landing";
import Timeline from "./pages/Timeline/Timeline";
import Gallery from "./pages/Gallery/Gallery";
import LoveLetter from "./pages/LoveLetter/LoveLetter";
import FinalStory from "./pages/FinalStory/FinalStory";

import MusicPlayer from "./components/common/MusicPlayer";
import dreamyMusic from "./pages/FinalStory/assets/music/dreamy.mp3";

import { MusicProvider } from "./hooks/MusicContext";

import "./styles/global.css";
import "./styles/animations.css";
import "./styles/themes.css";

function App() {
  return (
    <MusicProvider>
      <Router>
        {/* 🎵 GLOBAL MUSIC PLAYER */}
        <MusicPlayer src={dreamyMusic} volume={1} />

        <PageWrapper>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/reasons" element={<Reasons />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/letter" element={<LoveLetter />} />
            <Route path="/FinalStory" element={<FinalStory />} />
          </Routes>
        </PageWrapper>
      </Router>
    </MusicProvider>
  );
}

export default App;

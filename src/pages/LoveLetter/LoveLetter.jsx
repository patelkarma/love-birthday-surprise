import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoveLetter.css";

const letterLines = [
  "Dear you,",
  "",
  "Happy Birthday to someone who unexpectedly became a beautiful part of my story 🎂✨",
  "It’s funny how life brings people together when you least expect it,",
  "turning simple moments into memories that quietly stay forever 💫",
  "",
  "You are more than just someone special…",
  "you are comfort 🫶, inspiration 🌟, laughter 😄,",
  "and a calm presence that makes everything feel lighter 🤍",
  "",
  "With you, even ordinary days feel meaningful ✨",
  "like time slows down just enough to appreciate the moment.",
  "",
  "I may joke around 😌, act confident, or pretend I’m not sentimental…",
  "but the truth is, I admire you more than words can ever explain 💖",
  "",
  "Your happiness means more than you realize 🌸,",
  "your dreams deserve endless support 🌙,",
  "and your kindness is something the world needs more of 💫",
  "",
  "No matter where life leads 🌍…",
  "you’ll always have someone cheering for you from afar 🤝💛",
  "believing in your potential 🌟,",
  "and wishing you success in every future chapter ♾️✨",
  "",
  "So today, on your special day 🎉, remember this…",
  "you are valued 💎, respected 🤍, and truly unforgettable 💖",
  "",
  "Happy Birthday — keep shining.",
  "Wishing you success, happiness, and beautiful moments always ✨🎁",
];

export default function LoveLetter() {
  const navigate = useNavigate();
  const [currentLine, setCurrentLine] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (currentLine >= letterLines.length) {
      setShowButton(true);
      return;
    }

    const line = letterLines[currentLine];

    if (line === "") {
      const timeout = setTimeout(() => {
        setCurrentText("");
        setCurrentLine((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }

    let charIndex = 0;

    const typingInterval = setInterval(() => {
      setCurrentText((prev) => prev + line.charAt(charIndex));
      charIndex++;

      if (charIndex === line.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentText("");
          setCurrentLine((prev) => prev + 1);
        }, 300); // smoother pause
      }
    }, 45);

    return () => clearInterval(typingInterval);
  }, [currentLine]);

  return (
    <div className={`loveletter-page ${showButton ? "signature-mode" : ""}`}>
      {/* Back Arrow */}
      <button className="back-arrow" onClick={() => navigate(-1)}>
        ←
      </button>

      {/* 🌸 Background romantic decor */}
      <div className="romantic-decor">
        <span className="star">✨</span>
        <span className="star">✨</span>
        <span className="star">✨</span>

        <span className="heart">💖</span>
        <span className="heart">💖</span>
        <span className="heart">💖</span>
        <span className="heart">💖</span>

        <span className="emoji heart">💗</span>
        <span className="emoji heart">💞</span>
        <span className="emoji heart">💘</span>

        <span className="emoji sparkle">✨</span>
        <span className="emoji sparkle">🌸</span>
        <span className="emoji sparkle">💫</span>
      </div>

      {/* 💌 LETTER CARD */}
      <div
        className={`loveletter-container ${showButton ? "pause-shimmer" : ""}`}
      >
        {/* 💖 EMOJIS INSIDE CARD */}
        <div className={`letter-emojis ${showButton ? "emoji-react" : ""}`}>
          <span className="letter-emoji">💖</span>
          <span className="letter-emoji">💖</span>
          <span className="letter-emoji">💗</span>
          <span className="letter-emoji">💗</span>
          <span className="letter-emoji">✨</span>
          <span className="letter-emoji">✨</span>
          <span className="letter-emoji">✨</span>
          <span className="letter-emoji">✨</span>
          <span className="letter-emoji">🌸</span>
          <span className="letter-emoji">🌸</span>
          <span className="letter-emoji">🌸</span>
          <span className="letter-emoji">🌸</span>
        </div>

        {letterLines.slice(0, currentLine).map((line, index) => (
          <p key={index} className="loveletter-line">
            {line || "\u00A0"}
          </p>
        ))}

        {currentLine < letterLines.length && (
          <p className="loveletter-line typing">
            {currentText}
            <span className="cursor">|</span>
          </p>
        )}

        {showButton && (
          <div className="signature-sparkles">
            <span>✨</span>
            <span>✨</span>
            <span>✨</span>
            <span>✨</span>
          </div>
        )}

        {showButton && (
          <p className="loveletter-signature">
            Forever yours,
            <br />
            <span className="signature-name handwriting">Priya 💗</span>
          </p>
        )}
      </div>

      {showButton && (
        <button className="final-btn" onClick={() => navigate("/FinalStory")}>
          One last surprise… 🎁
        </button>
      )}
    </div>
  );
}

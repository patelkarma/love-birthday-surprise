import "./HeartParticles.css";

const heartPositions = [
  { top: "10%", left: "15%" },
  { top: "15%", left: "40%" },
  { top: "20%", left: "70%" },
  { top: "30%", left: "20%" },
  { top: "35%", left: "55%" },
  { top: "40%", left: "80%" },
  { top: "50%", left: "10%" },
  { top: "55%", left: "45%" },
  { top: "60%", left: "75%" },
  { top: "70%", left: "25%" },
  { top: "75%", left: "60%" },
  { top: "85%", left: "40%" },
  { top: "90%", left: "70%" },
];

export default function HeartParticles() {
  return (
    <div className="hearts-wrapper">
      {heartPositions.map((pos, index) => (
        <span
          key={index}
          className={`heart-emoji heart-${index}`}
          style={{
            top: pos.top,
            left: pos.left,
            fontSize: `${26 + index * 1}px`,
            animationDelay: `${index * 0.6}s`,
          }}
        >
          {index % 2 === 0 ? "💗" : "💕"}
        </span>
      ))}
    </div>
  );
}

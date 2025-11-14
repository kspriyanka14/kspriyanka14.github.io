import { useEffect, useState } from "react";

export const DarkSpaceBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    generateStars();

    const handleResize = () => {
      generateStars();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const generateStars = () => {
    // Generate different layers of stars for depth
    const smallStars = 300;
    const mediumStars = 100;
    const largeStars = 50;
    const newStars = [];

    // Small stars (far away)
    for (let i = 0; i < smallStars; i++) {
      newStars.push({
        id: `small-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkle: Math.random() > 0.7,
        twinkleDelay: Math.random() * 5,
      });
    }

    // Medium stars (mid-distance)
    for (let i = 0; i < mediumStars; i++) {
      newStars.push({
        id: `medium-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.4 + 0.5,
        twinkle: Math.random() > 0.5,
        twinkleDelay: Math.random() * 4,
      });
    }

    // Large stars (closer, brighter)
    for (let i = 0; i < largeStars; i++) {
      newStars.push({
        id: `large-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1.5,
        opacity: Math.random() * 0.3 + 0.7,
        twinkle: Math.random() > 0.3,
        twinkleDelay: Math.random() * 3,
      });
    }

    setStars(newStars);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Pitch black background */}
      <div className="absolute inset-0 bg-black" />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={star.twinkle ? "animate-twinkle" : ""}
          style={{
            position: "absolute",
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${
              star.opacity * 0.8
            })`,
            animationDelay: star.twinkle ? `${star.twinkleDelay}s` : "0s",
          }}
        />
      ))}

      {/* Shooting stars */}
      <div className="shooting-stars">
        {[...Array(3)].map((_, i) => (
          <div
            key={`meteor-${i}`}
            className="shooting-star"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 6 + Math.random() * 4}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

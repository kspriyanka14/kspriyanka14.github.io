import { useEffect, useState } from "react";

export const LightSkyBackground = () => {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    generateClouds();

    const handleResize = () => {
      generateClouds();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const generateClouds = () => {
    const numberOfClouds = 8;
    const newClouds = [];

    for (let i = 0; i < numberOfClouds; i++) {
      // Distribute clouds evenly across the screen width
      const startPosition = (i * 100) / numberOfClouds + Math.random() * 20;

      newClouds.push({
        id: i,
        // Start clouds at various positions across screen
        x: startPosition % 100,
        y: Math.random() * 60 + 5,
        size: Math.random() * 80 + 100,
        opacity: Math.random() * 0.3 + 0.5,
        // Vary the speed
        duration: Math.random() * 30 + 40,
      });
    }

    setClouds(newClouds);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              #87CEEB 0%,
              #B0D9F1 40%,
              #D4E8F5 100%
            )
          `,
        }}
      />

      {/* Clouds */}
      {clouds.map((cloud) => (
        <div
          key={`cloud-${cloud.id}`}
          className="animate-cloud-drift"
          style={{
            position: "absolute",
            top: `${cloud.y}%`,
            left: `${cloud.x}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            animationDuration: `${cloud.duration}s`,
            // No animation delay - clouds move immediately
            animationDelay: "0s",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 120"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: cloud.opacity }}
          >
            <ellipse cx="60" cy="80" rx="50" ry="40" fill="white" />
            <ellipse cx="100" cy="70" rx="60" ry="45" fill="white" />
            <ellipse cx="140" cy="80" rx="50" ry="40" fill="white" />
            <ellipse cx="90" cy="50" rx="45" ry="35" fill="white" />
          </svg>
        </div>
      ))}
    </div>
  );
};

import { useEffect, useState } from "react";

export default function Timer({ start, gameWon, reset }) {
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (reset) {
      setTimeLeft(120); 
    }
  }, [reset]);

  useEffect(() => {
    if (!start || gameWon) return; 
    if (timeLeft <= 0) return; 
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1); 
    }, 1000);

    return () => clearInterval(timer); 
  }, [start, timeLeft, gameWon]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}

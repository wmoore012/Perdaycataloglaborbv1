import { useState, useEffect } from "react";

const placeholders = [
  "Which track should I push this week?",
  "What's my catalog's strongest signal?",
  "Where is momentum building?",
  "Who should I call for a collab?",
  "What's quietly winning right now?",
  "Show me my hidden gems",
  "What needs my attention today?",
  "Which tracks are cooling off?",
  "What should I double down on?",
  "Where's the growth happening?",
  "What's my best bet for Q1?",
  "Show me emerging patterns",
  "Which songs have the best velocity?",
  "What's working that I'm missing?",
  "Where should I allocate budget?",
];

export function useRotatingPlaceholder(interval = 4000) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholders.length);
        setIsAnimating(false);
      }, 200);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return {
    placeholder: placeholders[index],
    isAnimating,
  };
}

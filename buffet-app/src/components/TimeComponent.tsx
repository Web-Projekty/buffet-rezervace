import { useEffect, useState } from "react";

const TimeComponent = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setCurrentTime(formattedTime);
    };

    updateCurrentTime();
    const interval = setInterval(() => {}, 1000);
    return () => clearInterval(interval);
  }, []);

  return <p>{currentTime}</p>;
};

export default TimeComponent;

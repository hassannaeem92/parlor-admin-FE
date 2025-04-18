import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedCount = ({ value }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const animation = async () => {
      let frame = 0;
      const totalFrames = 1; // Adjust as needed
      const increment = (value - animatedValue) / totalFrames;

      const update = () => {
        setAnimatedValue((prev) => prev + increment);
        frame++;

        if (frame < totalFrames) {
          requestAnimationFrame(update);
        }
      };

      update();
    };

    // Run the animation when the component mounts
    animation();

    // Cleanup function to stop the animation when the component unmounts
    return () => setAnimatedValue(value);
  }, []);

  return (
    <motion.span>
      {Math.floor(animatedValue).toLocaleString("en-IN")}
    </motion.span>
  );
};

export default AnimatedCount;

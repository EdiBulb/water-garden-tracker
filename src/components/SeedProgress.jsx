import React from "react";
import { motion } from "framer-motion";

export default function SeedProgress({ total, goal }) {
  const progress = Math.min(total / goal, 1); // 최대 100%까지만

  let stageImg = "/images/seed.png";
  let label = "seed";

  if (progress >= 0.3) {
    stageImg = "/images/sprout.png"; // sprout
    label = "seed";
  }
  if (progress >= 0.6) {
    stageImg = "/images/plant.png"; // plant
    label = "plant"
  }

  if (progress >= 1) {
    stageImg = "/images/flower.png";   // flower
    label = "flower"
  } 

  return (
    <div className="flex flex-col items-center mt-6">
      <motion.img
        key={label}  // stage가 바뀔 때 애니메이션이 실행되도록 key 사용
        src={stageImg}
        alt={label}
        className="w-40 h-40 object-contain"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
      />
      <p className="mt-2 text-xl font-semibold">{Math.floor(progress * 100)}%</p>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";

export default function SeedProgress({ total, goal }) {
  const progress = Math.min(total / goal, 1); // 최대 100%까지만

  let stageImg = "/images/seed.png";
  let label = "seed";

  if (progress >= 0.3) {
    stageImg = "/images/sprout.png"; // sprout
    label = "sprout";
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
    <div className="flex flex-col items-center mt-6 relative">
      {/* 🌈 부드러운 그라데이션 배경 */}
      <div className="absolute w-44 h-44 rounded-full bg-gradient-to-b from-green-200/80 to-transparent blur-2xl"></div>

      {/* 🌱 씨앗/새싹/꽃 이미지 */}
      <motion.img
        key={label}
        src={stageImg}
        alt={label}
        className="w-40 h-40 object-cover relative z-10 rounded-full border-4 border-green-200 shadow-md"
        initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
        animate={{
          opacity: 1,
          scale: progress >= 1 ? [1, 1.2, 1] : 1,
          filter: "blur(0px)",
          rotate: progress >= 1 ? [0, 8, -8, 0] : 0,
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          type: "tween",
        }}
      />

      {/* 🌿 퍼센트 표시 */}
      <p className="mt-2 text-xl font-semibold text-blue-700 drop-shadow-sm">
        {Math.floor(progress * 100)}%
      </p>
    </div>
  );
}

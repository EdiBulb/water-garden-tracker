import React from "react";

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
      <div className="w-40 h-40 flex items-center justify-center">
        <img 
          src={stageImg} 
          alt={label} 
          className="w-full h-full object-contain transition-all duration-700 ease-in-out transform hover:scale-110"
        />
      </div>
      <p className="mt-2 text-xl font-semibold">{Math.floor(progress * 100)}%</p>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";

import Confetti from "react-confetti";

export default function CelebrationModal({ show, onClose }) {
  if (!show) return null; // show=false면 렌더링 안 함

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      {/* Confetti 효과 */}
      <Confetti 
        width={window.innerWidth} 
        height={window.innerHeight}
        colors={["#38bdf8", "#0ea5e9", "#60a5fa", "#93c5fd"]} 
        />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-sky-100 to-blue-200 rounded-2xl shadow-2xl p-8 text-center max-w-md"
      >
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-blue-700 mb-2">
          Congratulations!
        </h2>
        <p className="text-lg text-gray-800 mb-6">
          You reached your daily goal 💧
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-sky-500 text-white rounded-full shadow-md hover:bg-sky-600 hover:scale-105 transition-transform"
        >
          Keep Hydrating 💧
        </button>
      </motion.div>
    </div>
  );
}

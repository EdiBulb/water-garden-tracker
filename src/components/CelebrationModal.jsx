import React from "react";
import Confetti from "react-confetti";

export default function CelebrationModal({ show, onClose }) {
  if (!show) return null; // show=false면 렌더링 안 함

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      {/* Confetti 효과 */}
      <Confetti width={window.innerWidth} height={window.innerHeight} />

      {/* 모달 박스 */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          🎉 Congratulations!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          You reached your daily goal 💧
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

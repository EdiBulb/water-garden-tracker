import React, { useState } from "react";

export default function WaterInput({ onAddWater }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = Number(amount);
    if (!num || num <= 0) return; // 0 이하 입력 방지
    onAddWater(num);               // 저장/기록은 Home이 담당
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex space-x-2">
      <input
        type="number"
        placeholder="ml"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="1"
        className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        + Add
      </button>
    </form>
  );
}

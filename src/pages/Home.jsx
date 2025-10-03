import React, { useState, useEffect  } from "react";
import SeedProgress from "../components/SeedProgress";
import WaterInput from "../components/WaterInput";

export default function Home() {
  const [goal, setGoal] = useState(2000); // 하루 목표 (ml)
  const [total, setTotal] = useState(0);  // 누적 마신 양

  // 오늘 날짜 (YYYY-MM-DD 형식)
  const today = new Date().toISOString().split("T")[0]; // new Date(): Date객체 생성, T 기준으로 잘라서, 배열으로 만듬 e.g., 225-10-01


  // 처음 페이지 로드 시 localStorage에서 오늘 기록 불러오기
  useEffect(() => {
    // goal 불러오기
    const savedGoal = localStorage.getItem("goal");
    if (savedGoal) {
      setGoal(Number(savedGoal));
    }

    const savedRecords = JSON.parse(localStorage.getItem("records")) || []; // in localStorage, getItem: Retrieve data
    const todayRecord = savedRecords.find(r => r.date === today);

    if (todayRecord) {
      setTotal(todayRecord.total);
    } else {
      setTotal(0);
    }
  }, [today]);

  // goal 변경 시 localStorage 저장
  const handleGoalChange = (e) => {
    const newGoal = Number(e.target.value);
    setGoal(newGoal);
    localStorage.setItem("goal", newGoal);
  };


  // 물 추가할 때 localStorage에도 반영
  const handleAddWater = (amount) => {
    const savedRecords = JSON.parse(localStorage.getItem("records")) || [];
    const existing = savedRecords.find(r => r.date === today);

    if (existing) {
      existing.total += Number(amount);
    } else {
      savedRecords.push({ date: today, total: Number(amount) });
    }

    // localStorage 업데이트
    localStorage.setItem("records", JSON.stringify(savedRecords));

    // state 업데이트
    setTotal(prev => prev + Number(amount));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-100 to-blue-200 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">🌱 Water Garden Tracker</h1>
      <div className="mb-4">
        <label className="mr-2 font-semibold">Daily Goal (ml):</label>
        <input
          type="number"
          value={goal}
          onChange={handleGoalChange}
          className="px-2 py-1 border rounded-md"
        />
      </div>
      <p className="text-lg text-gray-700 mb-4">Drank: {total}ml</p>

      <SeedProgress total={total} goal={goal} />
      <WaterInput onAddWater={handleAddWater} />
    </div>
  );
}

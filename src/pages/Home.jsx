import React, { useState, useEffect  } from "react";
import SeedProgress from "../components/SeedProgress";
import WaterInput from "../components/WaterInput";
import CelebrationModal from "../components/CelebrationModal";
import { motion, AnimatePresence } from "framer-motion";



export default function Home() {
  const [goal, setGoal] = useState(2000); // 하루 목표 (ml)
  const [total, setTotal] = useState(0);  // 누적 마신 양
  const [celebrate, setCelebrate] = useState(false); // 축하 여부
  const [showWatering, setShowWatering] = useState(false); // 물뿌리개 여부

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

    // 물뿌리개 애니메이션 실행
    setShowWatering(true);
    setTimeout(() => setShowWatering(false), 3000);

    // 목표 달성 체크
    if (total + amount >= goal) {
      setCelebrate(true);
    }

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-100 to-blue-200 p-6">
      {/* 축하 모달 */}
      <CelebrationModal show={celebrate} onClose={() => setCelebrate(false)} />

      {/* 물뿌리개 애니메이션 */}
      <AnimatePresence>
      {showWatering && (
        <>
          {/* 🌿 물뿌리개 (회전된 상태) */}
          <motion.div
            key="watering"
            initial={{ opacity: 0, y: -200, rotate: -45 }}
            animate={{ opacity: 1, y: 150, rotate: -45 }}
            exit={{ opacity: 0, y: -200, rotate: -45 }}
            transition={{ duration: 0.5 }}
            className="absolute left-1/2 -translate-x-1/2 z-50"
          >
            <img
              src="/images/watering-can.png"
              alt="Watering can"
              className="w-32 h-32 animate-bounce transform"
              style={{
                transformOrigin: "top right", // 물 나오는 부분 중심으로 회전
              }}
            />
          </motion.div>

          {/* 💧 물방울 (독립된 좌표, 회전 영향 없음) */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 200 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute"
            style={{
              top: "11rem",   // 물 나오는 부분 기준으로 수동 조정
              left: "50%",    // 뿌리개 이미지 끝부분 근처
            }}
          >
            <div className="w-3 h-3 bg-sky-400 rounded-full mb-1"></div>
            <div className="w-3 h-3 bg-sky-300 rounded-full mb-1"></div>
            <div className="w-3 h-3 bg-sky-200 rounded-full mb-1"></div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

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

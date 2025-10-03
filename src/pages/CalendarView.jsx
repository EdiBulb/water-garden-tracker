import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView() {
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [goal, setGoal] = useState(2000);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("records")) || [];
    setRecords(saved);

    const savedGoal = localStorage.getItem("goal");
    if (savedGoal) {
      setGoal(Number(savedGoal));
    }
  }, []);

  // 날짜 포맷 함수 (로컬 기준)
  const formatDate = (date) => {
    return date.toLocaleDateString("en-CA"); // YYYY-MM-DD
  };

  // 해당 날짜 기록 찾기
  const getRecordForDate = (date) => {
    const d = formatDate(date);
    return records.find((r) => r.date === d);
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-2xl font-bold mb-4">📅 Water Drinking Calendar</h1>
      <Calendar
        onClickDay={(value) => setSelectedDate(value)}
        tileContent={({ date }) => {
          const record = getRecordForDate(date);
          if (record && record.total >= goal) {
            // 목표 달성 시 초록색 동그라미
            return (
              <div className="flex justify-center items-center">
                <div
                  className="w-6 h-8 bg-sky-400 text-white text-xs flex items-center justify-center"
                  style={{
                    clipPath:
                      "path('M12 2 C17 2, 22 8, 12 22 C2 8, 7 2, 12 2 Z')",
                  }}
                >
                  {/* {date.getDate()} */}
                </div>
              </div>
            );
          }
          return null; // 기본 날짜 표시
        }}
      />

      {selectedDate && (
        <div className="mt-4 p-4 bg-white shadow rounded-md">
          <p className="font-semibold">
            {formatDate(selectedDate)}
          </p>
          <p>
            {getRecordForDate(selectedDate)
              ? `${getRecordForDate(selectedDate).total} ml`
              : "No record"}
          </p>
        </div>
      )}
    </div>
  );
}

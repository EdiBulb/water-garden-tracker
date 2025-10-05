import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Stats() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // localStorage에서 기록 불러오기
    const saved = JSON.parse(localStorage.getItem("records")) || [];
    // 최신 7일만 정렬해서 표시
    const sorted = saved
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // date를 기준으로 오름차순 정렬하고, 최근 7일을 뽑는다.
      .slice(-7);
    setRecords(sorted); // 최근 7일 기록으로 상태 변경
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-sky-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">📊 Weekly Water Intake</h1>

      {records.length > 0 ? (
        <div className="w-full max-w-2xl h-64 bg-white rounded-xl shadow-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={records} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ r: 5, fill: "#38bdf8" }}
                activeDot={{ r: 8, fill: "#0284c7" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-gray-600 mt-8">No records found. Start tracking today! 💧</p>
      )}
    </div>
  );
}

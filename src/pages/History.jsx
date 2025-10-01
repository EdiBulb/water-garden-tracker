import React, { useEffect, useState } from "react";

export default function History() {
  const [records, setRecords] = useState([]);

  // 페이지 로드 시, localStorage에서 기록 불러오기
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("records")) || []; // localStorage.getItem: Retrieve data
    setRecords(saved);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>📒 Water Drinking History</h1>
      {records.length === 0 ? (
        <p>No records yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {records.map((r, i) => (
            <li key={i} style={{ margin: "8px 0", fontSize: "18px" }}>
              <strong>{r.date}</strong> : {r.total}ml
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

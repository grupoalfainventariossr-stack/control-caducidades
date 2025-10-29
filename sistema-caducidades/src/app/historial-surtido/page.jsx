// src/app/reports/page.jsx
"use client";

import { useState } from "react";
import { getReportRanges, exportReportToExcel } from "@/services/reportsService";

export default function ReportsPage() {
  const [selectedRanges, setSelectedRanges] = useState([]);

  const ranges = getReportRanges();

  const toggleRange = (r) => {
    setSelectedRanges((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );
  };

  const handleExport = () => {
    exportReportToExcel(selectedRanges);
  };

  return (
    <section>
      <h2 className="section-title">Reportes de Caducidades</h2>
      <div className="card">
        <h3>Filtrar por rango de fechas</h3>
        <div className="ranges-container">
          {ranges.map((r) => (
            <label key={r.label}>
              <input
                type="checkbox"
                checked={selectedRanges.includes(r)}
                onChange={() => toggleRange(r)}
              />{" "}
              {r.label}
            </label>
          ))}
        </div>
        <div className="controls">
          <button className="btn" onClick={() => setSelectedRanges(ranges)}>Seleccionar todo</button>
          <button className="btn" onClick={() => setSelectedRanges([])}>Limpiar</button>
          <button className="btn btn-success" onClick={handleExport}>Exportar Reporte</button>
        </div>
      </div>
    </section>
  );
}

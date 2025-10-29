// src/components/ModalSave.jsx
"use client";
import { useState } from "react";
import { exportReportToExcel } from "@/services/reportsService";

export default function ModalSave() {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    exportReportToExcel([]);
    setOpen(false);
  };

  return (
    <>
      <button className="btn btn-success" onClick={() => setOpen(true)}>
        Guardar en Excel
      </button>
      {open && (
        <div className="modal" onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Guardar datos en Excel</h3>
            <p>Se generará un archivo con todos los productos y lotes registrados.</p>
            <div className="modal-buttons">
              <button className="btn" onClick={() => setOpen(false)}>
                Cancelar
              </button>
              <button className="btn btn-success" onClick={handleSave}>
                Guardar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

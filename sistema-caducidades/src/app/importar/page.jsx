"use client";

import { useState } from "react";

export default function ImportarPage() {
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImportar = async () => {
    if (!archivo) {
      alert("Selecciona un archivo Excel primero.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", archivo);

    const res = await fetch("/api/importar", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) setMensaje(`✅ ${data.message}`);
    else setMensaje(`❌ ${data.error || "Error desconocido"}`);
    setLoading(false);
  };

  return (
    <section>
      <h2 className="section-title">Importar Productos desde Excel</h2>

      <div className="card">
        <h3>Cargar archivo Excel</h3>
        <div className="file-input-wrapper">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setArchivo(e.target.files[0])}
          />
          <button className="btn btn-success" onClick={handleImportar}>
            {loading ? "Importando..." : "Importar"}
          </button>
        </div>

        {mensaje && (
          <div
            className="card"
            style={{ background: "#f8f8f8", border: "1px solid #ddd" }}
          >
            {mensaje}
          </div>
        )}
      </div>
    </section>
  );
}

// src/app/settings/page.jsx
"use client";

import { resetStorage } from "@/services/settingsService";

export default function SettingsPage() {
  const handleReset = () => {
    if (confirm("¿Seguro que deseas borrar todos los datos?")) {
      resetStorage();
      alert("Datos borrados correctamente.");
    }
  };

  return (
    <section>
      <h2 className="section-title">Configuración</h2>
      <div className="card">
        <h3>Opciones del sistema</h3>
        <p>Puedes limpiar todos los datos almacenados localmente (productos, surtidos e historial).</p>
        <button className="btn btn-danger" onClick={handleReset}>Restablecer todo</button>
      </div>
    </section>
  );
}

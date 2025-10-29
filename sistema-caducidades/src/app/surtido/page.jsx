// src/app/surtido/page.jsx
"use client";

import { useState } from "react";
import { processSurtido } from "@/services/surtidoService";
import SurtidoForm from "@/components/SurtidoForm";

export default function SurtidoPage() {
  const [mensaje, setMensaje] = useState(null);

  const handleProcesar = (data) => {
    const resultado = processSurtido(data);
    setMensaje(resultado);
  };

  return (
    <section>
      <h2 className="section-title">Surtido</h2>

      <div className="surtido-container">
        <SurtidoForm onProcesar={handleProcesar} />
        {mensaje && (
          <div className={`surtido-result ${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}
      </div>

      <div className="card">
        <h3>Instrucciones</h3>
        <ol>
          <li>Busque un producto por código o descripción.</li>
          <li>Seleccione el producto de la lista.</li>
          <li>Ingrese la cantidad (cajas o piezas).</li>
          <li>Seleccione o agregue un destino.</li>
          <li>Agregue al surtido y procese.</li>
        </ol>
        <p><strong>Nota:</strong> el sistema surtirá primero los lotes con fecha más próxima.</p>
      </div>
    </section>
  );
}

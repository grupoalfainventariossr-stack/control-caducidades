// src/app/components/layout/Header.jsx
'use client'; // Necesario para eventos onClick

import Link from 'next/link';

// NOTA: La lógica para mostrar el modal se manejará de forma global,
// por ahora el botón solo imprime en consola.
const showSaveOptions = () => {
    const modal = document.getElementById('saveModal');
    if (modal) {
        modal.style.display = 'flex';
    }
};

export default function Header() {
  return (
    <header>
      <h1>Control de Caducidades</h1>
      <div className="header-controls">
        <Link href="/dashboard" className="btn">Inicio</Link>
        <Link href="/products" className="btn">Productos</Link>
        <Link href="/reports" className="btn">Reportes</Link>
        <Link href="/historial-surtido" className="btn">Historial Surtido</Link>
        <Link href="/importar" className="btn">Importar</Link>
        <Link href="/settings" className="btn">Configuración</Link>
        <button className="btn btn-success" onClick={showSaveOptions}>
          Guardar en Excel
        </button>
      </div>
    </header>
  );
}
"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProductos: 0,
    caducados: 0,
    prox10: 0,
    prox30: 0,
    totalLotes: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/products");
        const productos = await res.json();

        let caducados = 0,
          prox10 = 0,
          prox30 = 0,
          totalLotes = 0;

        const hoy = new Date();

        productos.forEach((p) => {
          p.lotes.forEach((l) => {
            totalLotes++;
            const fecha = new Date(l.fecha);
            const diff = Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));

            if (diff < 0) caducados++;
            else if (diff <= 10) prox10++;
            else if (diff <= 30) prox30++;
          });
        });

        setStats({
          totalProductos: productos.length,
          caducados,
          prox10,
          prox30,
          totalLotes,
        });
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <section>
      <h2 className="section-title">Inicio</h2>
      <div className="card">
        <div className="icon">💾</div>
        <div>
          <strong>Sistema de guardado único</strong>
          <br />
          Use el botón <b>"Guardar en Excel"</b> para respaldar sus datos en un único archivo.
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Productos registrados</h3>
          <div className="value">{stats.totalProductos}</div>
        </div>
        <div className="dashboard-card">
          <h3>Caducados</h3>
          <div className="value" style={{ color: "#c33" }}>
            {stats.caducados}
          </div>
        </div>
        <div className="dashboard-card">
          <h3>Próx. 10 días</h3>
          <div className="value" style={{ color: "#e65100" }}>
            {stats.prox10}
          </div>
        </div>
        <div className="dashboard-card">
          <h3>Próx. 30 días</h3>
          <div className="value" style={{ color: "#ff9800" }}>
            {stats.prox30}
          </div>
        </div>
        <div className="dashboard-card">
          <h3>Total de lotes</h3>
          <div className="value" style={{ color: "#2e7d32" }}>
            {stats.totalLotes}
          </div>
        </div>
      </div>
    </section>
  );
}

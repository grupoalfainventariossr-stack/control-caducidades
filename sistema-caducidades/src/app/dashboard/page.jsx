// src/app/dashboard/page.jsx
export default function DashboardPage() {
  return (
    <section id="dashboard">
      <h2 className="section-title">Inicio</h2>
      <div className="auto-save-info">
        <div className="icon">💾</div>
        <div>
          <strong>Sistema de guardado único</strong><br />
          Use el botón "Guardar en Excel" para guardar todos los datos en un único archivo Excel.
          Guarde este archivo en una carpeta específica para mantener sus datos seguros.
        </div>
      </div>
      {/* El contenido de las tarjetas se generará dinámicamente más adelante */}
      <div className="dashboard-cards" id="dashboardCards">
        <p>Cargando datos del dashboard...</p>
      </div>
    </section>
  );
}
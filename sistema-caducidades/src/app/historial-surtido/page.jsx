'use client'; // Marcamos como componente de cliente porque tendrá filtros y botones interactivos.

export default function HistorialSurtidoPage() {
  return (
    <section id="historialSurtido">
      <h2 className="section-title">Historial de Surtidos</h2>

      <div className="card">
        <h3>Filtrar historial</h3>
        <div className="search-filter">
          <div>
            <label htmlFor="fechaInicio">Fecha inicio:</label>
            <input type="date" id="fechaInicio" />
          </div>
          <div>
            <label htmlFor="fechaFin">Fecha fin:</label>
            <input type="date" id="fechaFin" />
          </div>
          <div>
            <label htmlFor="filtroDestino">Destino:</label>
            <input type="text" id="filtroDestino" placeholder="Filtrar por destino..." />
          </div>
          <div>
            <label>&nbsp;</label>
            <button className="btn">Limpiar filtros</button>
          </div>
        </div>
      </div>

      <div className="controls">
        <button className="btn">Exportar Historial a Excel</button>
      </div>

      <div id="historialSurtidoList" className="surtido-historial">
        {/* Este div se llenará dinámicamente con los datos del historial. */}
        {/* Por ahora, mostramos un mensaje de carga. */}
        <div className="card">
            <p>No se encontraron surtidos en el historial.</p>
        </div>
      </div>
    </section>
  );
}
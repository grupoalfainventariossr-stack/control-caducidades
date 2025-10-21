'use client'; // Esta página necesita ser interactiva para que el usuario pueda seleccionar los rangos.

export default function ReportsPage() {

  return (
    <section id="reportes">
      <h2 className="section-title">Reportes de Caducidades</h2>

      <div className="card">
        <h3>Filtrar por rango de fechas</h3>
        <div className="ranges-container" id="rangesContainer">
          {/* Esta sección se generará dinámicamente con React.
            Por ahora, podemos poner algunos ejemplos estáticos para ver cómo se ve. 
          */}
          <div className="range-item">
            <input type="checkbox" id="7days" />
            <label htmlFor="7days">Próximos 1-7 días</label>
          </div>
          <div className="range-item">
            <input type="checkbox" id="15days" />
            <label htmlFor="15days">Próximos 15 días</label>
          </div>
          <div className="range-item">
            <input type="checkbox" id="1month" />
            <label htmlFor="1month">1 mes</label>
          </div>
          <div className="range-item">
            <input type="checkbox" id="3months" />
            <label htmlFor="3months">3 meses</label>
          </div>
          <div className="range-item">
            <input type="checkbox" id="6months" />
            <label htmlFor="6months">6 meses</label>
          </div>
          <div className="range-item">
            <input type="checkbox" id="1year" />
            <label htmlFor="1year">1 año en adelante</label>
          </div>
          <div className="range-item">
            <input type="checkbox" id="expired" />
            <label htmlFor="expired">Caducados</label>
          </div>
        </div>
        <div className="controls">
          <button className="btn">Seleccionar todo</button>
          <button className="btn">Limpiar</button>
          <button className="btn">Exportar Reporte</button>
        </div>
      </div>

      <div id="reportResult" style={{ marginTop: '20px' }}>
        {/* Aquí se mostrará la tabla con los resultados del reporte. */}
        <div className="card">
            <p>Seleccione al menos un rango para generar el reporte.</p>
        </div>
      </div>
    </section>
  );
}
'use client'; // Necesario para manejar la selección de archivos y los clics.

export default function ImportarPage() {

  return (
    <section id="importar">
      <h2 className="section-title">Importar Productos desde Excel</h2>

      <div className="file-upload-container">
        <h3>Cargar archivo Excel</h3>

        <div className="format-selector">
          <label>
            <input
              type="radio"
              name="importFormat"
              value="basic"
              defaultChecked
            />
            Formato básico (Código, Descripción, Familia)
          </label>
          <label>
            <input type="radio" name="importFormat" value="full" />
            Formato completo (con lotes)
          </label>
        </div>

        <div className="file-format-info" id="formatInfo">
          <p><strong>Formato requerido para el archivo Excel:</strong></p>
          <ul>
            <li>El archivo debe tener las columnas: <strong>Código</strong>, <strong>Descripción</strong> y <strong>Familia</strong></li>
            <li>La primera fila debe contener los encabezados de columna.</li>
          </ul>
          <p>Los productos importados se agregarán a los existentes, sin eliminarlos.</p>
        </div>

        <div className="file-input-wrapper">
          <input type="file" id="excelFileInput" accept=".xlsx, .xls" />
          <button className="btn btn-success">Importar</button>
        </div>

        <div id="importResult">
          {/* Aquí se mostrará el resumen de la importación */}
        </div>
      </div>

      <div className="controls">
        <button className="btn btn-warning">Eliminar Todos los Productos</button>
      </div>
    </section>
  );
}
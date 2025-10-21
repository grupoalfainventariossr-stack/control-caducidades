// src/app/products/page.jsx
'use client'; // Esta página será interactiva

export default function ProductsPage() {
  return (
    <section id="productos">
      <h2 className="section-title">Gestión de Productos</h2>
      <div className="controls">
        <button className="btn btn-success">{/* onClick se añadirá después */}
          + Nuevo Producto
        </button>
      </div>

      {/* El editor se mostrará condicionalmente */}
      <div id="editorPanel" className="editor hidden">
        {/* El contenido completo del editor irá aquí cuando lo convirtamos en componente */}
        <p>Editor de Productos...</p>
      </div>

      <div className="search-filter">
        <div>
          <label htmlFor="familyFilter">Filtrar por familia:</label>
          <select id="familyFilter">
            <option value="">Todas las familias</option>
          </select>
        </div>
        <div>
          <label htmlFor="globalSearch">Buscar:</label>
          <input id="globalSearch" type="text" placeholder="Código o descripción..." />
        </div>
        <div>
          <label>&nbsp;</label>
          <button className="btn">Quitar filtro</button>
        </div>
      </div>

      <div id="inventoryList">
        <p>Cargando lista de productos...</p>
      </div>
      <div className="small">Total de productos: <span id="totalCount">0</span></div>
    </section>
  );
}
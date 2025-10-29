"use client";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [productos, setProductos] = useState([]);
  const [familiaFiltro, setFamiliaFiltro] = useState("Todas las familias");
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true); // 👈 nuevo estado

  useEffect(() => {
    async function fetchProductos() {
      try {
        setLoading(true); // 👈 activar carga
        const res = await fetch("/api/products");
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false); // 👈 desactivar carga
      }
    }
    fetchProductos();
  }, []);

  const familias = [
    "Todas las familias",
    ...new Set(productos.map((p) => p.familia || "Sin familia")),
  ];

  const productosFiltrados = productos.filter((p) => {
    const coincideFamilia =
      familiaFiltro === "Todas las familias" || p.familia === familiaFiltro;
    const coincideBusqueda =
      p.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      (p.codes && p.codes.join(",").includes(busqueda));
    return coincideFamilia && coincideBusqueda;
  });

  return (
    <div className="container">
      <h2 className="section-title">Gestión de Productos</h2>

      {/* Barra de filtros */}
      <div className="inline-form" style={{ marginBottom: "20px" }}>
        <button className="btn btn-success">+ Nuevo Producto</button>

        <div className="form-group" style={{ maxWidth: "250px" }}>
          <label>Filtrar por familia:</label>
          <select
            value={familiaFiltro}
            onChange={(e) => setFamiliaFiltro(e.target.value)}
          >
            {familias.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ flex: "1" }}>
          <label>Buscar:</label>
          <input
            type="text"
            placeholder="Código o descripción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <button
          className="btn"
          style={{ background: "#0f3b4a" }}
          onClick={() => {
            setFamiliaFiltro("Todas las familias");
            setBusqueda("");
          }}
        >
          Quitar filtro
        </button>
      </div>

      {/* Loader mientras carga */}
      {loading ? (
        <div className="loader-wrapper">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      ) : productosFiltrados.length === 0 ? (
        <div className="card">
          <p style={{ textAlign: "center" }}>No hay productos registrados</p>
        </div>
      ) : (
        productosFiltrados.map((p) => (
          <div className="card" key={p._id}>
            <h3>{p.descripcion.toUpperCase()}</h3>
            <div className="small">{p.familia || "SIN FAMILIA"}</div>

            <div className="codes-display">
              <strong>Códigos:</strong> {p.codes.join(", ")}
            </div>

            {p.lotes && p.lotes.length > 0 ? (
              <div className="lotes-container">
                {p.lotes.map((lote, i) => (
                  <div key={i} className="lot-row">
                    <div>
                      <strong>Lote {i + 1}</strong>
                    </div>
                    <div>{lote.cajas || 0} cajas</div>
                    <div>{lote.cantidad || 0} piezas</div>
                    <div>
                      <span style={{ color: "var(--danger)" }}>
                        vence {lote.fecha || "sin fecha"}
                      </span>
                    </div>
                    <div>{lote.notas || ""}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontStyle: "italic", color: "#777" }}>
                No hay lotes registrados
              </p>
            )}

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button className="btn btn-primary btn-sm">Editar</button>
              <button
                className="btn btn-danger btn-sm"
                onClick={async () => {
                  if (!confirm("¿Eliminar producto?")) return;
                  await fetch(`/api/products/${p._id}`, { method: "DELETE" });
                  setProductos(productos.filter((x) => x._id !== p._id));
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

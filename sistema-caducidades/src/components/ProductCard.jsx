// src/components/ProductCard.jsx
"use client";
import { getExpirationStatus } from "@/services/productsService";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>{product.descripcion}</h3>
      <p><strong>Familia:</strong> {product.familia}</p>
      <div className="codes-display">
        <strong>Códigos:</strong> {product.codes?.join(", ")}
      </div>

      <table>
        <thead>
          <tr>
            <th>Lote</th>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {product.lotes?.map((l, i) => {
            const status = getExpirationStatus(l.fecha);
            return (
              <tr key={i}>
                <td>{l.codigo}</td>
                <td>{l.fecha}</td>
                <td>{l.cantidad}</td>
                <td>
                  <span className={`status-badge ${status.className}`}>
                    {status.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="editor-actions" style={{ marginTop: "10px" }}>
        <button className="btn btn-warning" onClick={onEdit}>
          Editar
        </button>
        <button className="btn btn-danger" onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

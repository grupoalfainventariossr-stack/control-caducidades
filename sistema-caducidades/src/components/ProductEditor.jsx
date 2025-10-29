// src/components/ProductEditor.jsx
"use client";
import { useState } from "react";

export default function ProductEditor({ product, onSave, onCancel }) {
  const [form, setForm] = useState({
    id: product.id || null,
    descripcion: product.descripcion || "",
    familia: product.familia || "",
    codes: product.codes || [""],
    lotes: product.lotes || [],
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddLote = () => {
    setForm({
      ...form,
      lotes: [...form.lotes, { codigo: "", fecha: "", cantidad: 0 }],
    });
  };

  const handleLoteChange = (i, key, value) => {
    const nuevos = [...form.lotes];
    nuevos[i][key] = value;
    setForm({ ...form, lotes: nuevos });
  };

  const handleRemoveLote = (i) => {
    const nuevos = form.lotes.filter((_, idx) => idx !== i);
    setForm({ ...form, lotes: nuevos });
  };

  const handleSave = () => onSave(form);

  return (
    <div className="editor card">
      <div className="editor-header">
        <h3>{form.id ? "Editar producto" : "Nuevo producto"}</h3>
        <div className="editor-actions">
          <button className="btn btn-success" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn btn-danger" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <input
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Familia</label>
        <input
          name="familia"
          value={form.familia}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Códigos</label>
        <input
          name="codes"
          value={form.codes.join(", ")}
          onChange={(e) =>
            setForm({ ...form, codes: e.target.value.split(",").map((c) => c.trim()) })
          }
        />
      </div>

      <h4>Lotes</h4>
      {form.lotes.map((l, i) => (
        <div className="lot-row" key={i}>
          <input
            placeholder="Código de lote"
            value={l.codigo}
            onChange={(e) => handleLoteChange(i, "codigo", e.target.value)}
          />
          <input
            type="date"
            value={l.fecha}
            onChange={(e) => handleLoteChange(i, "fecha", e.target.value)}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={l.cantidad}
            onChange={(e) => handleLoteChange(i, "cantidad", Number(e.target.value))}
          />
          <button className="btn btn-danger" onClick={() => handleRemoveLote(i)}>
            ✕
          </button>
        </div>
      ))}
      <button className="btn" onClick={handleAddLote}>
        + Agregar Lote
      </button>
    </div>
  );
}

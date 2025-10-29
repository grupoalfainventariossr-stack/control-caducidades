// src/components/SurtidoForm.jsx
"use client";
import { useState, useEffect } from "react";
import { getProducts } from "@/services/productsService";
import { getDestinos, saveDestino } from "@/services/surtidoService";

export default function SurtidoForm({ onProcesar }) {
  const [productos, setProductos] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [form, setForm] = useState({ producto: "", cantidad: 0, destino: "" });

  useEffect(() => {
    setProductos(getProducts());
    setDestinos(getDestinos());
  }, []);

  const handleAddDestino = () => {
    if (form.destino && !destinos.includes(form.destino)) {
      saveDestino(form.destino);
      setDestinos([...destinos, form.destino]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const producto = productos.find((p) => p.id === Number(form.producto));
    onProcesar({ producto, cantidad: Number(form.cantidad), destino: form.destino });
  };

  return (
    <form className="surtido-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Producto</label>
        <select
          value={form.producto}
          onChange={(e) => setForm({ ...form, producto: e.target.value })}
        >
          <option value="">Seleccionar producto...</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>{p.descripcion}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Cantidad</label>
        <input
          type="number"
          value={form.cantidad}
          onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Destino</label>
        <input
          value={form.destino}
          onChange={(e) => setForm({ ...form, destino: e.target.value })}
          list="destinos-list"
        />
        <datalist id="destinos-list">
          {destinos.map((d, i) => (
            <option key={i} value={d} />
          ))}
        </datalist>
      </div>

      <button type="button" className="btn" onClick={handleAddDestino}>
        + Guardar destino
      </button>
      <button type="submit" className="btn btn-success">
        Procesar Surtido
      </button>
    </form>
  );
}

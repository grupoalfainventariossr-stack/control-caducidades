// src/services/surtidoService.js
"use client";

import { getProducts, saveProduct } from "./productsService";

const STORAGE_KEY_SURTIDO = "surtidoHistorial";
const STORAGE_KEY_DESTINOS = "destinos";

export function processSurtido({ producto, cantidad, destino }) {
  const products = getProducts();
  const p = products.find((x) => x.id === producto.id);
  if (!p) return { tipo: "error", texto: "Producto no encontrado." };

  // Ordenar lotes por fecha más próxima
  if (p.lotes && p.lotes.length > 0)
    p.lotes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  let restante = cantidad;
  for (const lote of p.lotes) {
    if (restante <= 0) break;
    if (lote.cantidad >= restante) {
      lote.cantidad -= restante;
      restante = 0;
    } else {
      restante -= lote.cantidad;
      lote.cantidad = 0;
    }
  }

  saveProduct(p);

  // Registrar en historial
  const historial = getHistorial();
  historial.push({
    fecha: new Date().toISOString().split("T")[0],
    destino,
    producto: p.descripcion,
    cantidad,
  });
  localStorage.setItem(STORAGE_KEY_SURTIDO, JSON.stringify(historial));

  if (restante > 0)
    return { tipo: "warning", texto: "No hay suficiente stock para surtir todo." };
  return { tipo: "ok", texto: "Surtido procesado correctamente." };
}

export function getHistorial() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY_SURTIDO);
  return data ? JSON.parse(data) : [];
}

export function getHistorialFiltrado({ fechaInicio, fechaFin, destino }) {
  const lista = getHistorial();
  return lista.filter((h) => {
    const fecha = new Date(h.fecha);
    const start = fechaInicio ? new Date(fechaInicio) : null;
    const end = fechaFin ? new Date(fechaFin) : null;
    const coincideFecha =
      (!start || fecha >= start) && (!end || fecha <= end);
    const coincideDestino = !destino || h.destino.toLowerCase().includes(destino.toLowerCase());
    return coincideFecha && coincideDestino;
  });
}

export function getDestinos() {
  if (typeof window === "undefined") return [];
  const d = localStorage.getItem(STORAGE_KEY_DESTINOS);
  return d ? JSON.parse(d) : [];
}

export function saveDestino(dest) {
  const list = getDestinos();
  if (!list.includes(dest)) list.push(dest);
  localStorage.setItem(STORAGE_KEY_DESTINOS, JSON.stringify(list));
}

export function clearDestinos() {
  localStorage.removeItem(STORAGE_KEY_DESTINOS);
}

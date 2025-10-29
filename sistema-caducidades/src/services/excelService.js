// src/services/excelService.js
"use client";
import * as XLSX from "xlsx";
import { saveProduct } from "./productsService";

export async function importarDesdeExcel(file, formato = "completo") {
  try {
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type: "array" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(ws);

    data.forEach((r) => {
      if (formato === "basico") {
        saveProduct({
          id: Date.now() + Math.random(),
          descripcion: r.Descripción || r["Descripcion"] || "",
          familia: r.Familia || "",
          codes: [r.Código || r["Codigo"] || ""],
          lotes: [],
        });
      } else {
        // Formato completo
        const lote = {
          codigo: r.Código || r["Codigo"] || "",
          fecha: r["Fecha Caducidad"] || "",
          cantidad: Number(r.Piezas || 0),
          cajas: Number(r.Cajas || 0),
          notas: r.Notas || "",
        };
        saveProduct({
          id: Date.now() + Math.random(),
          descripcion: r.Descripción || r["Descripcion"] || "",
          familia: r.Familia || "",
          codes: [r.Código || r["Codigo"] || ""],
          lotes: [lote],
        });
      }
    });

    return "✅ Importación completada correctamente.";
  } catch (err) {
    console.error(err);
    return "❌ Error al importar el archivo.";
  }
}

// src/services/reportsService.js
import { getProducts, getExpirationStatus } from "./productsService";
import * as XLSX from "xlsx";

export function getDashboardStats() {
  const products = getProducts();
  let expired = 0,
    next10 = 0,
    next30 = 0,
    totalLotes = 0;

  products.forEach((p) => {
    if (!p.lotes) return;
    p.lotes.forEach((l) => {
      totalLotes++;
      const status = getExpirationStatus(l.fecha);
      if (status.className === "status-expired") expired++;
      else if (status.label.includes("PRÓXIMO")) next10++;
      else if (status.label.includes("EN") && status.label.includes("días"))
        next30++;
    });
  });

  return [
    { title: "Productos registrados", value: products.length, color: "#1a5d7a" },
    { title: "Caducados", value: expired, color: "#c33" },
    { title: "Próx. 10 días", value: next10, color: "#e65100" },
    { title: "Próx. 30 días", value: next30, color: "#ff9800" },
    { title: "Total de lotes", value: totalLotes, color: "#2e7d32" },
  ];
}

export function getReportRanges() {
  return [
    { label: "Caducados", dias: -1 },
    { label: "Próximos 7 días", dias: 7 },
    { label: "Próximos 30 días", dias: 30 },
    { label: "Próximos 60 días", dias: 60 },
    { label: "Más de 60 días", dias: 9999 },
  ];
}

export function exportReportToExcel(rangos) {
  const products = getProducts();
  const today = new Date();

  const data = [];
  products.forEach((p) => {
    p.lotes?.forEach((l) => {
      const exp = new Date(l.fecha);
      const diff = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
      rangos.forEach((r) => {
        if (
          (r.dias === -1 && diff < 0) ||
          (r.dias > 0 && diff >= 0 && diff <= r.dias)
        ) {
          data.push({
            Producto: p.descripcion,
            Lote: l.codigo || "",
            "Fecha Caducidad": l.fecha,
            "Días Restantes": diff,
          });
        }
      });
    });
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reporte");
  const fileName = `Reporte_Caducidades_${new Date()
    .toISOString()
    .slice(0, 10)}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

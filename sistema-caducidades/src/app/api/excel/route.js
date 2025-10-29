// src/app/api/excel/route.js
import * as XLSX from "xlsx";
import { NextResponse } from "next/server";

/**
 * API: /api/excel
 * Exporta los productos y lotes almacenados en localStorage (enviado desde el cliente)
 * a un archivo Excel descargable.
 */
export async function POST(req) {
  try {
    const { products } = await req.json();
    if (!products || products.length === 0)
      return NextResponse.json({ error: "No hay datos para exportar" }, { status: 400 });

    const rows = [];
    const today = new Date().toISOString().split("T")[0];

    products.forEach((p) => {
      p.lotes?.forEach((l) => {
        rows.push({
          Producto: p.descripcion,
          Familia: p.familia,
          Lote: l.codigo || "",
          "Fecha Caducidad": l.fecha || "",
          Cantidad: l.cantidad || 0,
          "Códigos asociados": p.codes?.join(", "),
        });
      });
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productos");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    const filename = `Reporte_Caducidades_${today}.xlsx`;
    const headers = new Headers({
      "Content-Disposition": `attachment; filename=${filename}`,
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return new NextResponse(buffer, { status: 200, headers });
  } catch (err) {
    console.error("Error exportando Excel:", err);
    return NextResponse.json({ error: "Error al exportar archivo" }, { status: 500 });
  }
}

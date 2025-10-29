import * as XLSX from "xlsx";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) return NextResponse.json({ error: "No se envió archivo" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const wb = XLSX.read(buffer, { type: "buffer" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(ws, { defval: "" });

    let count = 0;
    for (const r of data) {
      const producto = {
        descripcion: r["Descripción"] || r["Descripcion"] || "",
        familia: r["Familia"] || "General",
        codes: [r["Código"] || r["Codigo"] || ""],
        lotes: [
          {
            codigo: r["Código"] || r["Codigo"] || "",
            fecha: r["Fecha Caducidad"] || "",
            cantidad: Number(r["Piezas"] || 0),
            cajas: Number(r["Cajas"] || 0),
            notas: r["Notas"] || "",
          },
        ],
      };
      await Product.create(producto);
      count++;
    }

    return NextResponse.json({ ok: true, message: `Se importaron ${count} productos.` });
  } catch (err) {
    console.error("Error en importación:", err);
    return NextResponse.json({ error: "Error al importar archivo" }, { status: 500 });
  }
}

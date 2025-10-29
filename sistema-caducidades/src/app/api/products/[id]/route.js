import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 });
  }
}

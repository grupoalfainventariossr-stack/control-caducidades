import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}

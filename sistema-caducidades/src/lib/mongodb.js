// src/lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Falta definir MONGODB_URI en .env.local");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ Conectado a MongoDB local:", MONGODB_URI);
  } catch (err) {
    console.error("❌ Error de conexión MongoDB:", err);
  }
}

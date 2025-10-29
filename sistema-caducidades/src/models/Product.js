import mongoose from "mongoose";

const LoteSchema = new mongoose.Schema({
  codigo: String,
  fecha: String,
  cantidad: Number,
  cajas: Number,
  notas: String,
});

const ProductSchema = new mongoose.Schema(
  {
    descripcion: { type: String, required: true },
    familia: { type: String },
    codes: [String],
    lotes: [LoteSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);

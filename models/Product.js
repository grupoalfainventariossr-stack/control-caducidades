import mongoose from 'mongoose';

const loteSchema = new mongoose.Schema({
    cajas: { type: Number, default: 0 },
    piezas: { type: Number, default: 0 },
    fecha: { type: String },
    contado: { type: String },
    notas: { type: String, default: '' }
}, { _id: true });

const productSchema = new mongoose.Schema({
    codes: [{ type: String, required: true }],
    descripcion: { type: String, required: true },
    familia: { type: String, required: true },
    factor: { type: String, default: '' },
    tipoProducto: {
        type: String,
        enum: ['piezas', 'granel'],
        default: 'piezas'
    },
    lotes: [loteSchema]
}, {
    timestamps: true
});

// Índices para mejor rendimiento
productSchema.index({ codes: 1 });
productSchema.index({ descripcion: 'text' });
productSchema.index({ familia: 1 });

export default mongoose.model('Product', productSchema);
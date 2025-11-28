import mongoose from 'mongoose';

const loteUsadoSchema = new mongoose.Schema({
    fecha: String,
    cajasTomadas: Number,
    piezasTomadas: Number
});

const itemHistorialSchema = new mongoose.Schema({
    descripcion: String,
    codigo: String,
    familia: String,
    factor: String,
    tipoProducto: String,
    cajasSolicitadas: Number,
    piezasSolicitadas: Number,
    cajasProcesadas: Number,
    piezasProcesadas: Number,
    cajasNoProcesadas: Number,
    piezasNoProcesadas: Number,
    lotesUsados: [loteUsadoSchema]
});

const historialSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    destino: { type: String, required: true },
    items: [itemHistorialSchema],
    completado: { type: Boolean, default: false }
}, {
    timestamps: true
});

// Índice para búsquedas por fecha
historialSchema.index({ fecha: -1 });

export default mongoose.model('Historial', historialSchema);
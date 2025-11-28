import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    active: { 
        type: Boolean, 
        default: true 
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    permisos: {
        inicio: { type: Boolean, default: false },
        productos: { type: Boolean, default: false },
        productosEditar: { type: Boolean, default: false },
        surtido: { type: Boolean, default: false },
        reportes: { type: Boolean, default: false },
        historial: { type: Boolean, default: false },
        importar: { type: Boolean, default: false },
        configuracion: { type: Boolean, default: false }
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);
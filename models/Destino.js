import mongoose from 'mongoose';

const destinoSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true, 
        unique: true 
    }
}, {
    timestamps: true
});

export default mongoose.model('Destino', destinoSchema);
import { connectDB } from '../config/database.js';
import Product from '../models/Product.js';
import Historial from '../models/Historial.js';
import Destino from '../models/Destino.js';
import User from '../models/User.js';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrateData() {
    try {
        console.log('🔗 Conectando a MongoDB...');
        const connected = await connectDB();
        if (!connected) {
            console.log('❌ No se pudo conectar a MongoDB. Asegúrate de que esté instalado y ejecutándose.');
            process.exit(1);
        }

        console.log('🚀 Iniciando migración de datos desde archivos JSON a MongoDB...');
        
        const dataDir = join(__dirname, '..', 'data');
        
        let totalMigrated = 0;
        
        // Migrar Productos
        try {
            console.log('📦 Migrando productos...');
            const productsData = JSON.parse(await fs.readFile(join(dataDir, 'products.json'), 'utf8'));
            await Product.deleteMany({});
            const productsResult = await Product.insertMany(productsData);
            console.log(`✅ Migrados ${productsResult.length} productos`);
            totalMigrated += productsResult.length;
        } catch (error) {
            console.log('⚠️  No se pudieron migrar productos:', error.message);
        }
        
        // Migrar Historial
        try {
            console.log('📊 Migrando historial...');
            const historialData = JSON.parse(await fs.readFile(join(dataDir, 'historial.json'), 'utf8'));
            await Historial.deleteMany({});
            const historialResult = await Historial.insertMany(historialData);
            console.log(`✅ Migrados ${historialResult.length} registros de historial`);
            totalMigrated += historialResult.length;
        } catch (error) {
            console.log('⚠️  No se pudieron migrar historial:', error.message);
        }
        
        // Migrar Destinos
        try {
            console.log('📍 Migrando destinos...');
            const destinosData = JSON.parse(await fs.readFile(join(dataDir, 'destinos.json'), 'utf8'));
            await Destino.deleteMany({});
            const destinosObjects = destinosData.map(nombre => ({ nombre }));
            const destinosResult = await Destino.insertMany(destinosObjects);
            console.log(`✅ Migrados ${destinosResult.length} destinos`);
            totalMigrated += destinosResult.length;
        } catch (error) {
            console.log('⚠️  No se pudieron migrar destinos:', error.message);
        }
        
        // Crear usuario admin
        try {
            console.log('👤 Creando usuario admin...');
            const adminExists = await User.findOne({ username: 'admin' });
            if (!adminExists) {
                await User.create({
                    username: 'admin',
                    password: '1234',
                    active: true,
                    isAdmin: true,
                    permisos: {
                        inicio: true, productos: true, productosEditar: true,
                        surtido: true, reportes: true, historial: true,
                        importar: true, configuracion: true
                    }
                });
                console.log('✅ Usuario admin creado');
            } else {
                console.log('✅ Usuario admin ya existe');
            }
        } catch (error) {
            console.log('⚠️  No se pudo crear usuario admin:', error.message);
        }
        
        console.log(`🎉 Migración completada! Total de documentos migrados: ${totalMigrated}`);
        console.log('💡 Ahora puedes ejecutar: npm start');
        
    } catch (error) {
        console.error('❌ Error en migración:', error);
    } finally {
        process.exit(0);
    }
}

migrateData();